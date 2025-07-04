# Tic Tac Toe – Défi OpenDev Mada 🇲🇬
## Objectif
Créer un jeu de **morpion** jouable directement dans le navigateur, en **HTML, CSS, JavaScript **pur** (sans frameworks), avec :

- Une **interface agréable et responsive**
- Deux modes de jeu :
  - **Joueur vs Joueur (local)**
  - **Joueur vs IA (bot simple)**
- Intégration du **logo OpenDev Mada**
- Déploiement en ligne

## Fonctionnalités

-  **Deux modes de jeu** :
  - **Deux joueurs** (local sur le même appareil)
  - **VS Bot (IA)** 

-  **Timer intégré** :
  - Chaque joueur a **15 secondes** pour jouer
  - S’il ne joue pas à temps, il **perd automatiquement**

-  **IA** :
  - **Niveau intermédiaire** : le bot joue pour gagner, sinon il bloque le joueur
  - **Stratégie d’ouverture** intelligente :
    - Si X commence dans un **coin**  le bot joue au **centre**
    - Si X commence au **centre**  le bot joue dans un **coin**
    - Si X joue sur un **bord**  le bot joue au **centre**

-  **Reprise intelligente des tours** :
  - Le **joueur qui perd** commence la manche suivante
  - En cas d’égalité, le même joueur rejoue

-  **Système de score** :
  - Les scores sont **cumulés** entre les manches
  - Le bouton “Reset” permet de **tout remettre le score à zéro**


## IA (Bot)

Le mode **VS Bot** repose sur une **intelligence artificielle progressive** :

| Situation | Action de l'IA |
|-----------|----------------|
| Peut gagner | Joue pour gagner  |
| Le joueur peut gagner | Bloque le coup  |
| Ligne ouverte possible | Joue dans une ligne stratégique  |
| Aucune stratégie évidente | Joue aléatoirement  |

>  L’IA peut être encore améliorée avec un algorithme **Minimax** si besoin.

---

## Pour démarrer localement

1. Clone le dépôt :

```bash
git clone https://github.com/Astna17/Tic-Tac-Toe.git
cd Tic Tac Toe
