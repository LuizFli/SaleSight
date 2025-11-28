# 🚀 Guia de Implantação na AWS (Docker)

Este guia descreve como configurar o ambiente utilizando 3 instâncias separadas na AWS:
1. **Banco de Dados (MySQL)**
2. **Frontend (Next.js)**
3. **Backend (Node.js)**

---

## 🐳 1. Instalação do Docker (Em todas as instâncias)

Execute os comandos abaixo em **todas** as instâncias para instalar e configurar o Docker:

```bash
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
newgrp docker
docker ps
```

---

## 🗄️ 2. Configuração do Banco de Dados (MySQL)

Na instância dedicada ao banco de dados:

### Baixar e Rodar o Container
```bash
docker pull mysql:latest   
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=senai -p 3306:3306 mysql:latest
```

### Acessar o Banco (Opcional)
Para acessar o terminal do MySQL dentro do container:
```bash
docker exec -it mysql mysql -u root -p
# Digite a senha: senai
```

**Comandos SQL úteis:**
```sql
show databases;
use salesigth_db;
select * from users;
```

**Gerenciar o Container:**
```bash
docker ps -a       # Listar containers
docker stop mysql  # Parar container
docker rm mysql    # Remover container
```

---

## 💻 3. Configuração do Frontend

Na instância dedicada ao Frontend:

```bash
# Baixar a imagem mais recente
docker pull luizfli/sa-frontend:latest

# Rodar o container apontando para o IP do Backend
# Substitua o IP abaixo pelo IP PÚBLICO da sua instância de Backend
docker run -d -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL="http://52.203.182.51:4000" luizfli/sa-frontend:latest 
```

---

## ⚙️ 4. Configuração do Backend

Na instância dedicada ao Backend:

```bash
# Baixar a imagem mais recente
docker pull luizfli/sa-backend:latest

# Rodar o container configurando as conexões
# Substitua os IPs abaixo pelos IPs corretos das suas instâncias
docker run -d --name sa-backend -p 4000:4000 -e SIMULATOR_URL="http://52.72.137.244:3000" -e DATABASE_URL="mysql://root:senai@52.23.42.4:3306/salesigth_db" -e CORS_ALLOWED_ORIGINS="http://34.205.98.50:3000" luizfli/sa-backend:latest

# Popular o banco de dados (Seed)
docker exec sa-backend node prisma/seed.js
```
