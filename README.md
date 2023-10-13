# pi_webgis

## O que é um WebGIS?

Um WebGIS (Sistema de Informação Geográfica na Web) é uma aplicação baseada na web que permite a visualização, análise e manipulação de dados geoespaciais. Ele combina informações geográficas e recursos interativos da web para fornecer uma plataforma poderosa para a tomada de decisões baseadas em localização. Os WebGIS são amplamente utilizados em diversas áreas, como planejamento urbano, gestão de recursos naturais, agricultura, geologia, meio ambiente e muito mais.

## Por que Utilizar um WebGIS?

A utilização de um WebGIS oferece diversas vantagens, incluindo:

- **Acesso Universal**: Como é baseado na web, um WebGIS permite que usuários de diferentes locais acessem e colaborem facilmente em análises geoespaciais.

- **Visualização de Dados**: Oferece a capacidade de visualizar dados geográficos complexos em mapas interativos, tornando mais fácil entender padrões e tendências.

- **Tomada de Decisões Baseadas em Localização**: Permite tomar decisões informadas considerando a localização geográfica, o que é crucial em muitos campos, como logística, marketing e planejamento urbano.

- **Integração de Dados**: Facilita a integração de dados geoespaciais de várias fontes, possibilitando análises mais abrangentes.

- **Compartilhamento de Informações**: Permite compartilhar informações geográficas de maneira eficiente com partes interessadas e o público em geral.

Este projeto, pi_webgis, é uma implementação de um WebGIS usando a estrutura Django e a biblioteca Leaflet para criar mapas interativos na web. Siga as instruções abaixo para configurar e personalizar seu próprio WebGIS com base neste projeto.

## Pré-requisitos

Antes de começar, certifique-se de ter o Python instalado em seu sistema. Você pode fazer isso seguindo os passos abaixo:

1. **Baixar o Python**:
   - Faça o download da versão mais recente do Python no [site oficial](https://www.python.org/downloads/).

2. **Instalação**:
   - Durante a instalação, marque a opção "Adicionar Python ao PATH" para que o Python seja facilmente acessível a partir do terminal.

## Configurando o Projeto

Siga estas etapas para configurar o seu projeto:

1. **Crie uma pasta para o projeto**:
   - Crie uma pasta em um local de sua escolha para armazenar o seu projeto Python.

2. **Crie um Ambiente Virtual**:
   - Abra o terminal e navegue até a pasta do projeto que você acabou de criar. Em seguida, crie um ambiente virtual com o seguinte comando:
     ```
     python -m venv venv
     ```

3. **Ative o Ambiente Virtual**:
   - Ative o ambiente virtual. As instruções podem variar dependendo do seu sistema operacional:
     - **No Windows (PowerShell)**:
       ```
       .\venv\Scripts\Activate.ps1
       ```

4. **Instale o Django**:
   - Com o ambiente virtual ativado, instale o Django usando o seguinte comando:
     ```
     pip install django
     ```

5. **Crie o Projeto Django**:
   - Dentro da pasta do projeto, crie um novo projeto Django com o nome que você desejar. Neste exemplo, estamos usando "setup":
     ```
     django-admin startproject setup .
     ```
     Certifique-se de que o nome do projeto está correto, pois ele será usado nas configurações do projeto.

6. **Execute o Projeto**:
   - Inicie o servidor de desenvolvimento Django com o seguinte comando:
     ```
     python manage.py runserver
     ```
     Você deve ver uma mensagem indicando que o servidor está em execução em http://127.0.0.1:8000/.

7. **Crie um Aplicativo Django**:
   - Para criar um aplicativo em seu projeto, use o seguinte comando (substitua "mapleaflet" pelo nome do seu aplicativo):
     ```
     python manage.py startapp mapleaflet
     ```

## Configurando o Aplicativo e o Mapa Leaflet

Siga estas etapas para configurar o aplicativo e criar um mapa Leaflet:

1. **Crie uma Pasta "Templates"**:
   - Dentro da pasta do aplicativo "mapleaflet", crie uma pasta chamada "templates". Esta pasta será usada para armazenar os modelos HTML.

2. **Crie um Arquivo HTML**:
   - Dentro da pasta "templates", crie um arquivo HTML que representará a página com o mapa Leaflet.

3. **Crie uma Visualização**:
   - No arquivo "views.py" do aplicativo "mapleaflet", crie uma função de visualização que renderize o arquivo HTML criado anteriormente. Por exemplo:
     ```python
     from django.shortcuts import render

     def home(request):
         return render(request, "mapleaflet/home.html")
     ```

4. **Configure as Rotas**:
   - No arquivo "urls.py" do projeto (pasta "setup"), importe a função de visualização e configure uma rota para ela:
     ```python
     from mapleaflet.views import home

     urlpatterns = [
         path('', home),
         # Adicione outras rotas aqui, se necessário.
     ]
     ```

5. **Execute o Projeto Novamente**:
   - Reinicie o servidor de desenvolvimento Django com o comando:
     ```
     python manage.py runserver
     ```

Agora você deve ser capaz de acessar a página com o mapa Leaflet em http://127.0.0.1:8000/. Certifique-se de personalizar seu mapa e aplicativo de acordo com suas necessidades.

---

Este README fornece um guia básico para configurar um projeto Django com um aplicativo que usa Leaflet para criar um mapa da web. Lembre-se de consultar a documentação oficial do Django e do Leaflet para obter informações mais detalhadas e personalizar seu projeto de acordo com suas necessidades específicas.

Claro, aqui está a seção que você deseja acrescentar no README, reescrita de forma mais detalhada e organizada:

## Instalação do PostgreSQL

Siga estas etapas para instalar o PostgreSQL:

1. **Baixe o Instalador do PostgreSQL**:
   - Acesse o site oficial do PostgreSQL (https://www.postgresql.org/download/) e faça o download do instalador apropriado para o seu sistema operacional.

2. **Prossiga com o Processo de Instalação**:
   - Execute o instalador baixado e siga as instruções fornecidas durante o processo de instalação.

3. **Defina uma Senha para o Usuário "postgres"**:
   - Durante a instalação, você será solicitado a definir uma senha para o usuário "postgres" do banco de dados. Certifique-se de lembrar dessa senha, pois você a usará posteriormente.

4. **Instale a Extensão Espacial PostGIS**:
   - No Windows, você pode usar o Stack Builder, que é instalado junto com o PostgreSQL, para instalar a extensão espacial PostGIS. Siga as instruções para adicioná-la ao seu PostgreSQL.

## Criação do Banco de Dados

Siga estas etapas para criar o banco de dados:

1. **Crie um Banco de Dados**:
   - Use uma ferramenta de administração de banco de dados, como o pgAdmin, para criar um banco de dados que será usado para armazenar as camadas da sua aplicação.

2. **Crie um Esquema**:
   - Dentro do banco de dados, crie um esquema para organizar os dados.

3. **Habilite a Extensão PostGIS**:
   - Dentro do banco de dados criado, habilite a extensão PostGIS para permitir o armazenamento de dados geoespaciais.

## Acrescentar Camadas no Banco de Dados

Siga estas etapas para adicionar camadas ao banco de dados usando o software QGIS:

1. **Crie uma Conexão no QGIS**:
   - Configure uma conexão no QGIS para se conectar ao banco de dados que você criou anteriormente.

2. **Abra a Camada de Interesse**:
   - Abra a camada geoespacial de interesse no QGIS.

3. **Importe a Camada para o Banco de Dados**:
   - Use as funcionalidades do QGIS para importar a camada no banco de dados, garantindo que ela seja associada ao esquema e banco de dados corretos.

## Instalação do GeoServer (Servidor de Mapas)

Siga estas etapas para instalar o GeoServer:

1. **Baixe o Instalador do GeoServer**:
   - Acesse o site oficial do GeoServer (https://geoserver.org/download/) e faça o download do instalador apropriado para o seu sistema operacional.

2. **Prossiga com o Processo de Instalação**:
   - Execute o instalador baixado e siga as instruções fornecidas durante o processo de instalação.

## Publicação da Camada de Interesse

Siga estas etapas para publicar a camada de interesse usando o GeoServer:

1. **Crie um "Data Store"**:
   - No GeoServer, crie um "Data Store" para estabelecer a conexão com o banco de dados que contém suas camadas geoespaciais.

2. **Crie um "Layer"**:
   - Crie um "Layer" no GeoServer para configurar as propriedades da camada de dados que você deseja publicar.

3. **Crie uma "Workspace"**:
   - É recomendável criar uma "Workspace" para definir o endereço que será usado para acessar as camadas em sua aplicação.

4. **Publique a Camada como um Serviço WMS**:
   - Finalmente, publique a camada como um serviço WMS no GeoServer.

## Integração da Camada de Dados na Aplicação

Para integrar a camada de dados em sua aplicação, você pode usar uma função do Leaflet para incluir a camada. Certifique-se de consultar a documentação do Leaflet para obter detalhes sobre como realizar essa integração.

Com essas etapas, você estará pronto para integrar e visualizar camadas de dados geoespaciais em sua aplicação baseada em WebGIS. Lembre-se de consultar a documentação específica de cada ferramenta para obter informações mais detalhadas.
