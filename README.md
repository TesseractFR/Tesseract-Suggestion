# Tesseract-Suggestion
Bot permettant d'enregistrer les suggestions discord sur le trello

## Commandes

### Ajouter une suggestion
Usage : `suggestion {titre}: {description}`

Permission : Tout le monde

Ajoute une suggestion et créé la carte correspondante sur le trello.

### Accepter une suggestion
Usage : `accept {id}`

Permission : Rôle `Trello`

Accepte une suggestion. Envoie une notification à l'auteur de la suggestion. L'`id` est l'id de la carte trello.

### Refuser une suggestion
Usage : `reject {id}: {reason}`

Permission : Rôle `Trello`

Refuse une suggestion. Envoie une notification à l'auteur de la suggestion. L'`id` est l'id de la carte trello. La raison sera ajoutée au message d'origine.
