## Social-APP server

Serwer napisany w Node.JS przy pomocy środowiska pracy Express.JS. Jest on częścią napisanej przeze mnie aplikacji. Odpowiada za przetwarzanie requestów przychodzących z aplikacji oraz wykonywanie odpowiednich operacji, czy wysyłanie danych.

## DEMO APLIKACJI
link

#### Serwer składa się z głównego routera oraz z kilku zasobów

* interest:
  * kontrolery,
  * model,
  * router.
  
* user:
  * kontrolery,
  * model,
  * router.
  
* post: 
  * kontrolery,
  * model,
  * router.
  
Przy czym:
* kontrolery to funkcje, które wykonują odpowiednie zapytania do nierelacyjnej bazy MongoDB oraz zwracają dane jeżeli zajdzie taka potrzeba.
* modele to kolekcje dokumentów mongoDB. Są tworzone przy pomocy biblioteki mongoose.
* routery oczekują na requesty oraz przekierowują je do odpowiednich kontrollerów.

#### Funkcjonalności

* tworzenie, modyfikowanie, edycja, usuwanie postów,
* tworzenie, edytowanie kont,
* pobranie gotowych zainteresowań/tagów,
* autoryzacja (jsonwebtoken),
* szyfrowanie hasł (bcrypt),
* dodawanie plików na serwer (multer).

#### Użyte technologie

* Node.JS,
* Express.JS,
* mongoDB, mongoose.

#### Uruchamianie

1. npm i
2. npm run dev
