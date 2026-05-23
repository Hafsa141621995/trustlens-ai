# TrustLens AI

TrustLens AI est une application web d’analyse conversationnelle assistée par intelligence artificielle.

L’utilisateur colle une conversation, un échange ou un message, puis l’application analyse :
- les incohérences,
- les ambiguïtés,
- les émotions dominantes,
- les points à clarifier,
- un score global de cohérence.

L’objectif est de fournir une lecture structurée et neutre d’une conversation grâce à un modèle IA génératif.

---

# Fonctionnalités

- Analyse conversationnelle intelligente
- Détection des incohérences
- Analyse émotionnelle
- Questions suggérées pour clarifier la situation
- Score de cohérence
- Dashboard visuel moderne
- Interface frontend responsive

---

# Stack Technique

## Frontend
- Next.js
- TypeScript
- Tailwind CSS

## Backend
- FastAPI
- Python

## Intelligence Artificielle
- NVIDIA NIM API
- Modèle Llama 3.1

---

# Architecture

Frontend Next.js  
↓  
Backend FastAPI  
↓  
API NVIDIA Llama  
↓  
Analyse JSON structurée  
↓  
Dashboard visuel interactif

---

# Installation

## 1. Cloner le projet

```bash
git clone <repo_url>
cd trustlens-ai