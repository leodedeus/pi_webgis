# pi_webgis
1. Instalar o python
    1. fazer o download
    2. instalar marcando a opção de add às variáveis de ambiente
2. Criar uma pasta para armazenar o projeto python
    1. dentro da pasta do projeto, criar o ambiente virtual
    
    ```python
    python -m venv venv
    ```
    
    b. ativar o ambiente virutal (códo para o powershell no windows)
    
    ```python
    meuambiente\Scripts\Activate.ps1
    ```
    
    3. Instalar o Django (com o ambiente virtual do projeto ativado)
    
    ```python
    pip install django
    ```
    
    4. Criar o projeto Django
    
    ```python
    django-admin startproject setup .
    ```
    
    conforme orientação do vídeo que segui (https://www.youtube.com/watch?v=rwSHQqQWGnI) o nome do projeto esta sendo substituído por setup, visto que o “projeto” é apenas uma pasta do sistema, com os arquivos de configuração do projeto.
    
    5. Executar o projeto
    
    ```python
    python [manage.py](http://manage.py/) runserver
    ```
    
    6. Criar um app no projeto Django
    
    Essa app será usada para criar um mapa leaflet.
    
    ```python
    python [manage.py](http://manage.py/) startapp mapleaflet
    ```
    
    7. Cria uma pasta Template, dentro do app, e cria uma arquivo html
    8. No arquivo Views, no app, cria uma função que vai chamar o arquivo html criado anteriormente
    
    ```python
    def home(request):
        return render(request, "mapleaflet/home.html")
    ```
    
    9. No arquivo urls (da pasta Setup) importa o arquivo home e cria a rota para este arquivo
    
    ```python
    from mapleaflet.views import home
    ```
    
    ```python
    path('', home),
    ```
    
    10. Inicia a aplicação executando:
    
    ```python
    python [manage.py](http://manage.py/) runserver
    ``` 
