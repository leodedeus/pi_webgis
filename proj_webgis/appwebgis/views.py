from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json

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

            # Converta as coordenadas para o formato geom do PostGIS e SRID 31983
            coordenadas = f'SRID=4326;POINT({longitude} {latitude})'

            # Crie a consulta SQL para inserção
            sql = f"INSERT INTO camadas.feature_point_escola_publica(nome_escola, geom) VALUES (%s, ST_Transform(ST_GeomFromText(%s, 4326), 31983));"
            #sql = f"INSERT INTO camadas.feature_point_escola_publica(nome_escola, geom) VALUES (%s, ST_GeomFromText(%s));"
            #sql = f"INSERT INTO camadas.feature_point_escola_publica(nome_escola, geom) VALUES (%s, ST_Transform(ST_MakePoint(%s,%s), 31983));"
            #sql = "INSERT INTO camadas.feature_point_escola_publica(nome_escola, geom) VALUES (%s, ST_Transform(ST_MakePoint(%s, %s), 31983));"

            
            # Execute a consulta SQL
            connection.execute(sql, [nome, coordenadas])

            return JsonResponse({'message': f'Escola "{nome}" adicionada com sucesso!'})

    except Exception as e:
        print(f'Erro ao adicionar escola: {e}')
        return JsonResponse({'error': f'Erro ao adicionar escola: {e}'}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)

