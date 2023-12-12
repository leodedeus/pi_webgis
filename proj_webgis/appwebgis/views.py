from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json
from django.http import HttpResponseServerError
import traceback

def home(request):
    return render(request, "appwebgis/home.html")


# SeuApp/views.py

# Conectar-se ao banco de dados usando as configurações do Django
connection = connection.cursor()
@csrf_exempt
def adicionar_escola(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            nome = data.get('nome')
            latitude = data.get('latitude')
            longitude = data.get('longitude')

            # Converta as coordenadas para o formato geom do PostGI
            coordenadas = f'SRID=4326;POINT({longitude} {latitude})'

            # Crie a consulta SQL para inserção
            sql = f"INSERT INTO camadas.feature_point_escola_publica(nome_escola, geom) VALUES (%s, ST_Transform(ST_GeomFromText(%s, 4326), 31983));"
            #sql = f"INSERT INTO camadas.feature_point_escola_publica(nome_escola, geom) VALUES (%s, ST_GeomFromText(%s));"
            #sql = f"INSERT INTO camadas.feature_point_escola_publica(nome_escola, geom) VALUES (%s, ST_Transform(ST_MakePoint(%s,%s), 31983));"
            #sql = "INSERT INTO camadas.feature_point_escola_publica(nome_escola, geom) VALUES (%s, ST_Transform(ST_MakePoint(%s, %s), 31983));"

            
            # Execute a consulta SQL usando a classe connection
            with connection.cursor() as cursor:
                cursor.execute(sql, [nome, coordenadas])

            return JsonResponse({'message': f'Escola "{nome}" adicionada com sucesso!'})

    except Exception as e:
        print(f'Erro ao adicionar escola: {e}')
        return JsonResponse({'error': f'Erro ao adicionar escola: {e}'}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def pesquisar_escola(request):
    if request.method == 'GET':
        nome_escola = request.GET.get('nome', '')

        if nome_escola:
            try:
                # Execute a consulta SQL para pesquisar a escola pelo nome
                sql = """SELECT nome_escola, ST_AsGeoJSON(ST_Transform(geom, 4326)) AS coordenadas, endereco FROM camadas.feature_point_escola_publica WHERE nome_escola ILIKE %s LIMIT 1;"""
                with connection.cursor() as cursor:
                    cursor.execute(sql, [f'%{nome_escola}%'])
                    result = cursor.fetchone()

                if result:
                    nome, coordenadas, endereco = result
                    print(f'Escola encontrada - Nome: {nome}, Coordenadas: {coordenadas}, Endereço: {endereco}')

                    return JsonResponse({'encontrada': True, 'escola': {'nome': nome, 'coordenadas': json.loads(coordenadas), 'endereco': endereco}})
                else:
                    print(f'Escola não encontrada para o nome: {nome_escola}')
                    return JsonResponse({'encontrada': False})
            except Exception as e:
                print(f'Erro ao executar consulta SQL: {e}')
                return JsonResponse({'error': f'Erro ao executar consulta SQL: {e}'}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)
'''
@csrf_exempt
def identificar_escola(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            latitude = data.get('latitude')
            longitude = data.get('longitude')

            # Converta as coordenadas para o formato geom do PostGIS
            coordenadas = f'SRID=4326;POINT({longitude} {latitude})'
            print("coordenadas recebidda no backend")

            # Execute a consulta SQL para identificação
            sql = """
                SELECT 
                    cod_entidade, nome_escola, cod_ra, cod_dre, endereco, cep, telefone, email,
                    ST_AsGeoJSON(ST_Transform(geom, 4326)) AS coordenadas
                FROM camadas.feature_point_escola_publica
                WHERE ST_Intersects(ST_Transform(geom, 31983), ST_Buffer(ST_Transform(ST_GeomFromText(%s, 4326), 31983), 10))
            """
            print("sql montado", sql)
            
            # Execute a consulta SQL
            with connection.cursor() as cursor:
                cursor.execute(sql, [coordenadas])
                results = cursor.fetchall()

            # Converta os resultados para um formato adequado para resposta JSON
            feicoes_json = [
                {
                    'cod_entidade': row[0],
                    'nome_escola': row[1],
                    'cod_ra': row[2],
                    'cod_dre': row[3],
                    'endereco': row[4],
                    'cep': row[5],
                    'telefone': row[6],
                    'email': row[7],
                    'coordenadas': json.loads(row[8])
                } for row in results
            ]

            return JsonResponse({'feicoes': feicoes_json})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
'''
from django.db import connection
from django.http import JsonResponse
import json

@csrf_exempt
def identificar_feicao(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            latitude = data.get('latitude')
            longitude = data.get('longitude')

            # Converta as coordenadas para o formato geom do PostGIS
            coordenadas = f'SRID=4326;POINT({longitude} {latitude})'

            # Use um cursor para executar a consulta SQL
            with connection.cursor() as cursor:
                # Execute a consulta SQL para identificação
                sql = """
                    SELECT 
                        cod_entidade, nome_escola, cod_ra, cod_dre, endereco, cep, telefone, email,
                        ST_AsGeoJSON(ST_Transform(geom, 4326)) AS coordenadas
                    FROM camadas.feature_point_escola_publica
                    WHERE ST_Intersects(ST_Transform(geom, 31983), ST_Buffer(ST_Transform(ST_GeomFromText(%s, 4326), 31983), 10))
                """
            
                cursor.execute(sql, [coordenadas])

                result = cursor.fetchone()
                if result:
                    cod_entidade, nome_escola, cod_ra, cod_dre, endereco, cep, telefone, email, coordenadas = result
                    print(f'Escola encontrada - Nome: {nome_escola}, Coordenadas: {coordenadas}, Endereço: {endereco}')

                    return JsonResponse({ #o nome a esquerda é o que é lido no js, e o nome a direita é o que é recebido do banco
                        'encontrada': True,
                        'escola': {
                            'cod_entidade': cod_entidade,
                            'nome': nome_escola,
                            'cod_ra': cod_ra,
                            'cod_dre': cod_dre,
                            'endereco': endereco,
                            'cep': cep,
                            'telefone': telefone,
                            'email': email,
                            'coordenadas': json.loads(coordenadas),
                        }
                    })
                else:
                    print(f'Escola não encontrada para as coordenadas: {coordenadas}')
                    return JsonResponse({'encontrada': False})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)
