[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Czpw_ePo)
# Boîte musicale

Dans cet exercice, vous devez créer une application web pour gérer une liste de lecture des titres musicaux (playlist).

## Modalité
* Vous devez réaliser l'exercice en binôme.
* Cet exercice est noté, le rendu doit être envoyé sur GitHub Classroom.
* Le compte rendu est obligatoire, et doit impérativement indiquer les noms et prénoms de binôme.

## Consignes
Vous devrez créer une application de gestion de liste de lecture musicale à l’exemple de l'application présent sur [ce lien](https://polytechlyon.github.io/3a-isi1-24-25-tp-jukebox-example/).

Vous devez utiliser le framework Vue 3 pour réaliser cet exercice, sans aucune libraire tierce.

## Fonctionnalités
Il s'agit d'une application mono-page.
L'interface utilisateur comporte trois parties :
* Un contrôleur pour arrêter et reprendre le lecteur audio.
* Une liste de lecture.
* Un formulaire pour ajouter un titre à la liste.

Par simplicité, la liste ne sera pas sauvegardée entre les rechargements de la page.

### Interface utilisateur
#### Contrôleur
Lorsqu'il y a un titre en cours de lecture, le contrôleur affiche l'intitulé de ce titre, ainis qu'une barre indiquant le progrès de la lecture.
Un bouton permet de mettre en pause ou de reprendre le titre, selon l'état de lecture.

L'utilisateur peut choisir le mode de répétition grâce à un contrôle adequate.
Les modes de répétition disponibles sont Liste, Titre, ou Aucun.

#### Liste de lecture
La liste de lecture affiche les intitulés des titres ajoutés par l'utilisateur.
Chaque item est accompagné de deux boutons : un pour jouer le titre, et un pour le supprimer.

L'intitulé du titre en cours de lecture est mis en évidence, par exemple avec un texte en gras.

Les titres qui ne fonctionnent pas, par exemple, à cause d'un lien défectueux, auront le bouton de lecture grisé.
Leurs items seront marqués, par exemple par un texte barré. 

#### Formulaire d'ajout
Ce formulaire permet d'ajouter un titre à la liste de lecture.
Deux types d'ajout sont possibles : soit par lien, soit par fichier.

L'utilisateur précise le mode d'ajout souhaité grâce à un contrôle adéquat.

Pour un ajout par lien, l'utilisateur doit saisir l'URL d'un fichier audio accessible en ligne.
Le formulaire d'ajout ne vérifie pas la validité du lien.
L'intitulé du titre est être déduit automatiquement du lien.

Pour un ajout par fichier, l'utilisateur doit sélectionner un fichier audio depuis son système de fichiers.
Le formulaire d'ajout ne vérifie pas le format de fichier.
L'intitulé du titre est déduit automatiquement du nom de fichier.

Au lieu de la déduction automatique de l'intitulé, vous pouvez, selon votre choix, fournir un champ de saisi dédié à cette fin.

### Lecture
Lorsque le mode de répétition Liste est choisi (le mode par défaut), le lecteur joue les titres de la liste dans l'ordre.
Quand la liste est terminée, la lecture reprend de début de la liste.
Si le mode de répétition Aucun est choisi, le lecteur joue les titres dans l'ordre aussi.
Par contre, quand la liste est terminée, la lecture s'arrête.
Si le mode de répétition Titre est choisi, le lecteur joue le titre en cours de lecture en boucle.

Lorsque l'utilisateur clique sur la barre du progrès, la lecture saute à la position correspondante.

Lorsqu'un titre défectueux est détecté, il est marqué comme tel.
Le lecteur passe automatiquement au titre suivant à chaque fois qu'un titre défectueux est rencontré.
Un titre peut être défectueux pour plusieurs raisons, par exemple, un lien invalide ou un fichier audio corrompu.

## Contraintes
* Vous devez utiliser Vue 3 pour réaliser cet exercice.
* Vous ne pouvez pas utiliser de librairie tierce.
* Évitez d'utiliser l'attribut `controls` de l'élément `audio`.

# Compte rendu
Le compte rendu doit être fourni en complétant le fichier [`Rapport.md`](Rapport.md) et doit indiquer les noms et prénoms des membres du binôme.
Il doit, d'une manière brève, décrire et justifier les choix de conception et de réalisation.
Il doit aussi décrire les difficultés rencontrées et les solutions apportées. 

Les extensions réalisées doivent être mentionnées, d'une manière claire, dans le compte rendu.

## Extensions
Une fois que toutes les fonctionnalités ci-dessus sont réalisées avec succès, les fonctionnalités supplémentaires suivantes peuvent être réalisées afin d'obtenir des points de bonus.
L'application présente sur [ce lien](https://polytechlyon.github.io/3a-isi1-24-25-tp-jukebox-extensions-example/) donne un exemple de la réalisation de ces extensions. 

Les points de bonus peuvent être rapportés à la note finale du module ISI 1. 
Cependant, la note finale ne peut pas dépasser 20/20. 

### Sauvegarde des titres publics
Les titres ajoutés par lien public sont sauvegardés entre rafraichissements de page. 
Les titres ajoutés par fichier ne sont pas sauvegardés.

### Organisation de plusieurs listes de lecture
L'utilisateur peut créer plusieurs listes de lecture.
Chaque liste aura son propre nom.
Pour visualiser et organiser les listes de lecture, l'utilisateur doit naviguer vers la vue de gestion des listes, accessible par un lien dédié.
Cette vue affiche la liste des noms des listes de lecture, ainis que le nombre de titres dans chaque liste.
Chaque item, correspondant à une liste de lecture, est accompagné d'un bouton de suppression, et d'un bouton de sélection.
La liste actuellement sélectionnée ne peut pas être supprimée.

En sélectionnant une liste, l'utilisateur est redirigé vers la vue principale de l'application, mais avec la liste sélectionnée chargée.

Un formulaire permet de créer une nouvelle liste de lecture.

Cette extension nécessite l'utilisation de l'API de navigation de Vue Router.

## Références
* [Vue 3](https://vuejs.org/)
* [Méthode statique `createObjectURL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static)
* [Élément d'audio embarqué](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
* [Vue Router](https://router.vuejs.org/) (pour l'extension de plusieurs listes de lecture)







