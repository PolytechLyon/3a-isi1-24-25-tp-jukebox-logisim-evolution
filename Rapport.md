# Compte Rendu TP Jukebox

## Binôme
- Coutant Luka
- Grenier Lilas

## Choix de conception et de réalisation
Les consignes du projet sont dans le fichier [Consignes](Consignes.md).  

[index.html](index.html) se trouve à la racine, et le code source du projet se trouve dans le dossier dossier [src](src). A la racine de [src](src) se trouvent les fichiers [App.vue](src/App.vue) et [main.js](src/main.js), et les sous-dossiers [composables](src/composables) (contenant [gestionPlaylist.js](src/composables/gestionPlaylist.js) modèles des fonctions communes aux components) et [components](src/components). Ce dernier contient [Player.vue](src/components/Player.vue), [Playlist.vue](src/components/Playlist.vue) et [AddTrack.vue](src/components/AddTrack.vue), créées selon le modèle script-template-style de Vue, correspondant aux différents éléments de la page.  

La documentation des fichiers se trouvent dans tous les fichiers .js et les balises script.

## Difficultés rencontrées (optionnel)
L'avantage de Vue et de centraliser le code en fonction de son utilisation - ainsi, une seule page contient le modèle (entre les bornes script), la contenu de la page (entre les bornes template) et le style (entre les bornes style) - mais cela devient plus compliqué de travailler à plusieurs sur une petite application : merge conflicts, empiètement sur le travail l'un de l'autre...  

Une autre difficulté a été la vérification de l'état des fichiers. Plusieurs tentatives n'ont pas donné de résultats et ont dues être reprises de zéro avant la version actuelle.

## Extensions réalisées (optionnel)
La playlist est enregistrée dans le local storage, et est donc conservée entre les chargements de la page.