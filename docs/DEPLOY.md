# 🚀 Guía de Despliegue en DigitalOcean

## 1. Crear Droplet

1. Ve a [DigitalOcean](https://cloud.digitalocean.com)
2. Create → Droplets
3. Selecciona:
   - **Image:** Ubuntu 24.04 LTS
   - **Plan:** Basic, 4GB RAM / 2 vCPU ($24/mes)
   - **Region:** Frankfurt (más cerca de España)
   - **Authentication:** SSH Key (recomendado)

## 2. Conectar al Droplet

```bash
# Desde PowerShell
ssh root@TU_IP_DROPLET
```

## 3. Instalar Docker

```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose-plugin -y

# Verificar
docker --version
docker compose version
```

## 4. Subir Código

### Opción A: Git (recomendado)
```bash
# En el Droplet
cd /root
git clone https://github.com/DAMSanti/Inmoniliaria.git app
cd app
```

### Opción B: SCP desde tu PC
```powershell
# En PowerShell (tu PC)
scp -r C:\Users\santiagota\source\repos\Inmo\* root@TU_IP:/root/app/
```

## 5. Configurar Variables de Entorno

```bash
# En el Droplet
cd /root/app
cp .env.example .env
nano .env
```

Edita las variables principales:
```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD_SEGURO@postgres:5432/vacacional_db"
NEXTAUTH_SECRET="genera-un-secret-con: openssl rand -base64 32"
NEXTAUTH_URL=http://TU_IP_DROPLET:3000
```

## 6. Iniciar Aplicación

```bash
# Desarrollo (para probar)
docker compose -f docker-compose.dev.yml up --build -d

# Ver logs
docker compose -f docker-compose.dev.yml logs -f

# Ver estado
docker ps
```

## 7. Acceder a la Aplicación

- **Web:** http://TU_IP_DROPLET:3000
- **Adminer (DB):** http://TU_IP_DROPLET:8080
- **Mailhog:** http://TU_IP_DROPLET:8025

## 8. Comandos Útiles

```bash
# Parar todo
docker compose -f docker-compose.dev.yml down

# Reiniciar
docker compose -f docker-compose.dev.yml restart

# Ver logs de un servicio
docker compose -f docker-compose.dev.yml logs app

# Ejecutar migraciones
docker compose -f docker-compose.dev.yml exec app npx prisma migrate deploy

# Entrar al contenedor
docker compose -f docker-compose.dev.yml exec app sh
```

## 9. Configurar Firewall

```bash
ufw allow 22      # SSH
ufw allow 80      # HTTP
ufw allow 443     # HTTPS
ufw allow 3000    # Next.js (temporal)
ufw enable
```

## 10. Dominio (cuando lo tengas)

1. En tu proveedor DNS, añade registro A:
   - `@` → TU_IP_DROPLET
   - `www` → TU_IP_DROPLET

2. Configura SSL con Certbot:
```bash
apt install certbot -y
certbot certonly --standalone -d tudominio.com -d www.tudominio.com
```

---

## 🔧 Troubleshooting

### Error de conexión DB
```bash
docker compose -f docker-compose.dev.yml logs postgres
```

### Error de permisos
```bash
chmod +x docker/*.sh
```

### Reiniciar desde cero
```bash
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up --build -d
```

---

## 📊 Monitoreo

```bash
# Uso de recursos
docker stats

# Espacio en disco
df -h

# Memoria
free -m
```
