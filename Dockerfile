# Dockerfile frontend pour production (build déjà fait localement)

# Étape unique : serveur Caddy
FROM caddy:2.7.6-alpine

# Copier le build local (dist/) dans le conteneur
# Assure-toi d'avoir fait npm run build localement avant
COPY dist/ /usr/share/caddy

# Exposer le port 80
EXPOSE 80

# Caddy sert automatiquement les fichiers statiques du dossier /usr/share/caddy

