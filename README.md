# Directorio SAEL

Aplikacija za agendu kontakata Službe za pomoć lokalnim entitetima (Diputación de Cádiz).

**Tehnologije**: React + TypeScript + Vite + Tailwind CSS + Supabase

---

## Preduslovi

Prije nego što počneš, provjeri da imaš instalirano sljedeće na računaru:

- **Node.js** (verzija 18 ili novija) — preuzmi sa [nodejs.org](https://nodejs.org)
- **npm** (dolazi uz Node.js) — provjeri sa `npm --version` u terminalu
- **Git** (opciono, ali preporučeno) — preuzmi sa [git-scm.com](https://git-scm.com)
- **Tekstualni editor** — preporučujemo [VS Code](https://code.visualstudio.com)

Da provjeriš da li ti je Node instaliran, otvori terminal i ukucaj:

```bash
node --version
npm --version
```

Ako dobiješ brojeve verzija (npr. `v20.x.x` i `10.x.x`), sve je u redu.

---

## Korak 1: Kreiranje Supabase projekta

Supabase je besplatna platforma koja nam služi kao backend — daje nam bazu podataka (PostgreSQL), sistem za autentifikaciju korisnika i REST API, sve bez pisanja serverskog koda.

### 1.1 Registracija

1. Otvori [supabase.com](https://supabase.com) u pretraživaču.
2. Klikni **Start your project** (ili **Sign Up**).
3. Prijavi se preko GitHub naloga (najlakše) ili napravi nalog sa emailom.

### 1.2 Kreiranje novog projekta

1. Kad se prijaviš, klikni zeleno dugme **New Project**.
2. Popuni polja:
   - **Name**: `directorio-sael` (ili kako god hoćeš)
   - **Database Password**: zapamti ovu lozinku (trebaće ti samo ako pristupaš bazi direktno)
   - **Region**: izaberi **West EU (Ireland)** ili najbližu regiju
3. Klikni **Create new project**.
4. Sačekaj 1–2 minuta da se projekat inicijalizuje (videćeš loading indikator).

### 1.3 Kopiraj API kredencijale

Ovo su dva podatka koja tvoja aplikacija koristi da komunicira sa Supabase-om:

1. U lijevom meniju klikni na **Settings** (ikonica zupčanika na dnu).
2. Klikni na **API** u podmeniju.
3. Kopiraj i sačuvaj negdje ova dva podatka:
   - **Project URL** — izgleda ovako: `https://abcdefghij.supabase.co`
   - **anon public key** — dugačak string koji počinje sa `eyJ...`

> Ove podatke ćeš nalijepit u `.env` fajl u koraku 3.

---

## Korak 2: Podešavanje baze podataka

Sada treba kreirati tabele u bazi i unijeti početne podatke iz CSV fajla profesora.

### 2.1 Kreiranje tabela (schema.sql)

1. U Supabase dashboardu, klikni na **SQL Editor** u lijevom meniju.
2. Klikni **New query** (ili **+ New snippet**).
3. Otvori fajl `supabase/schema.sql` iz projekta na svom računaru.
4. Kopiraj **cijeli sadržaj** tog fajla.
5. Nalijepi ga u SQL Editor na Supabase-u.
6. Klikni **Run** (zeleno dugme dole-desno ili `Ctrl+Enter`).
7. Treba da vidiš poruku **Success. No rows returned.** — to znači da je sve kreirano uspješno.

Ovaj SQL fajl kreira:
- Tabelu `contactos` — čuva sve kontakte (ime, prezime, telefon, email, služba itd.)
- Tabelu `user_roles` — čuva ulogu svakog korisnika (user ili admin)
- **Row Level Security (RLS)** politike — osigurava da samo admini mogu mijenjati podatke, a obični korisnici mogu samo čitati
- **Trigger** — automatski dodjeljuje ulogu `user` svakom novom korisniku pri registraciji
- Funkciju `make_admin()` — pomoću koje ćeš promovisati korisnika u admina

### 2.2 Unos početnih podataka (seed.sql)

1. Ponovo u **SQL Editoru**, klikni **New query**.
2. Otvori fajl `supabase/seed.sql` iz projekta.
3. Kopiraj cijeli sadržaj i nalijepi ga u SQL Editor.
4. Klikni **Run**.
5. Treba da vidiš poruku **Success. No rows returned.**

Sad imaš 30 kontakata u bazi (uvezeni iz CSV-a profesora).

> Da provjeriš: idi na **Table Editor** u lijevom meniju, klikni na tabelu `contactos` i trebalo bi da vidiš listu svih kontakata.

### 2.3 Isključi potvrdu emaila (za lakše testiranje)

Po default-u Supabase traži od korisnika da potvrde email prije nego mogu da se prijave. Za razvoj i testiranje, ovo je lakše isključiti:

1. Idi na **Authentication** u lijevom meniju.
2. Klikni na **Providers** tab.
3. Klikni na **Email** provajder.
4. Isključi opciju **Confirm email** (prebaci prekidač na OFF).
5. Klikni **Save**.

> Ovako ćeš moći odmah da se registruješ i prijaviš bez čekanja na konfirmacioni email.

---

## Korak 3: Podešavanje aplikacije na računaru

### 3.1 Otvaranje projekta

Otvori terminal i navigiraj do foldera projekta:

```bash
cd "putanja/do/Projekat faks/agenda-contactos"
```

### 3.2 Instalacija zavisnosti

Pokreni ovu komandu da instaliraš sve potrebne biblioteke:

```bash
npm install
```

Ovo će kreirati folder `node_modules/` sa svim zavisnostima. Može potrajati 15–30 sekundi.

### 3.3 Kreiranje .env fajla

Aplikacija koristi `.env` fajl da zna kako da se poveže na tvoj Supabase projekat. Kopiraj primjer fajla:

```bash
cp .env.example .env
```

Sad otvori `.env` u editoru i zamijeni placeholder vrijednosti sa pravim podacima iz koraka 1.3:

```
VITE_SUPABASE_URL=https://tvoj-projekat-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tvoj-anon-key-ovdje...
```

> **Bitno**: nema razmaka oko znaka `=`, nema navodnika oko vrijednosti.

### 3.4 Pokretanje aplikacije

```bash
npm run dev
```

Trebalo bi da vidiš nešto ovako:

```
  VITE v8.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Otvori `http://localhost:5173` u pretraživaču — trebalo bi da vidiš stranicu za prijavu.

> Da zaustvaviš server: pritisni `Ctrl+C` u terminalu.

---

## Korak 4: Kreiranje korisnika i testiranje

### 4.1 Registracija prvog korisnika

1. Na login stranici, klikni **"¿No tienes cuenta? Regístrate"**.
2. Upiši email i lozinku (minimum 6 karaktera).
3. Klikni **Registrarse**.
4. Ako si isključio potvrdu emaila (korak 2.3), odmah ćeš biti preusmjeren na listu kontakata.

### 4.2 Promovisanje u admina

Da bi mogao da dodaješ, mijenjaš i brišeš kontakte, moraš promovisati svog korisnika u admina:

1. Idi na Supabase dashboard → **SQL Editor**.
2. Napravi novi query i pokreni:

```sql
SELECT make_admin('email-kojim-si-se-registrovao@example.com');
```

3. Vrati se u aplikaciju.
4. **Odjavi se** (ikonica za izlaz gore-desno).
5. **Prijavi se ponovo** — sad ćeš vidjeti:
   - Žutu oznaku **Admin** pored svog emaila u zaglavlju
   - Dugme **+ Nuevo** za dodavanje novih kontakata
   - Dugmad **Editar** i **Eliminar** na stranici svakog kontakta

### 4.3 Kreiranje običnog korisnika (USER)

Da testiraš USER profil:

1. Odjavi se iz admin naloga.
2. Registruj se sa drugim emailom.
3. Ovaj korisnik će automatski dobiti ulogu `user`.
4. Trebalo bi da vidi listu kontakata, pretragu, filter i detalje, ali **bez** dugmadi za dodavanje/izmjenu/brisanje.

---

## Korak 5: Objava na webu (besplatno)

Da bi aplikacija bila dostupna preko URL adrese (kako profesor traži), moraš je objaviti na hosting servisu.

### Opcija A: Vercel (preporučeno — najlakše)

1. Napravi nalog na [vercel.com](https://vercel.com) (prijavom preko GitHub-a).
2. Instaliraj Vercel CLI:

```bash
npm install -g vercel
```

3. U folderu projekta pokreni:

```bash
vercel
```

4. Pratite uputstva u terminalu:
   - **Set up and deploy?** → `Y`
   - **Which scope?** → izaberi svoj nalog
   - **Link to existing project?** → `N`
   - **What's your project's name?** → `directorio-sael` (ili Enter za default)
   - **In which directory is your code located?** → `./` (Enter)
   - Vercel će automatski detektovati Vite i podesiti build

5. Kad završi, dobiješ URL tipa `https://directorio-sael.vercel.app`.

6. **Dodaj varijable okruženja**: idi na Vercel dashboard → tvoj projekat → **Settings → Environment Variables** i dodaj:
   - `VITE_SUPABASE_URL` = tvoj URL
   - `VITE_SUPABASE_ANON_KEY` = tvoj ključ

7. Ponovo pokreni deploy da primijeni varijable:

```bash
vercel --prod
```

### Opcija B: Netlify

1. Pokreni build:

```bash
npm run build
```

2. Idi na [app.netlify.com](https://app.netlify.com) i napravi nalog.
3. Prevuci i pusti (drag & drop) folder `dist/` na Netlify dashboard.
4. Dodaj varijable okruženja u **Site settings → Environment variables**.
5. Dobijaš URL tipa `https://directorio-sael.netlify.app`.

> **Za SPA routing**: napravi fajl `public/_redirects` sa sadržajem:
> ```
> /*    /index.html   200
> ```
> Ovo je potrebno da React Router radi ispravno sa direktnim URL-ovima.

---

## Korak 6: Generisanje APK-a sa Capacitorom

Capacitor omogućava da istu web aplikaciju zapakovuješ kao Android APK, bez pisanja posebnog mobilnog koda.

### Preduslovi za APK

- **Android Studio** — preuzmi sa [developer.android.com/studio](https://developer.android.com/studio)
- **Java JDK 17+** — Android Studio obično instalira ovo automatski

### 6.1 Instalacija Capacitora

Iz foldera projekta pokreni ove komande jednu po jednu:

```bash
npm install @capacitor/core @capacitor/cli
```

```bash
npx cap init "Directorio SAEL" "es.dipucadiz.sael" --web-dir dist
```

```bash
npm install @capacitor/android
```

```bash
npx cap add android
```

Ovo kreira folder `android/` u projektu sa kompletnim Android projektom.

### 6.2 Build i sinhronizacija

Svaki put kad nešto promijeniš u kodu, moraš ponovo buildovati i sinhronizovati:

```bash
npm run build
npx cap sync android
```

- `npm run build` — kompajlira React aplikaciju u folder `dist/`
- `npx cap sync android` — kopira `dist/` u Android projekat i ažurira native zavisnosti

### 6.3 Otvaranje u Android Studiju

```bash
npx cap open android
```

Ovo otvara Android projekat u Android Studiju.

### 6.4 Generisanje APK-a

1. U Android Studiju, sačekaj da se projekat sinhronizuje (Gradle sync — može potrajati prvi put).
2. Idi na **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. Sačekaj da se build završi (~1–3 minuta).
4. Kad završi, klikni na **locate** link u notifikaciji dole-desno.
5. APK fajl se nalazi u `android/app/build/outputs/apk/debug/app-debug.apk`.

### 6.5 Instalacija na telefon

- **Preko kabla**: Poveži telefon USB kablom, uključi USB debugging, i klikni Run u Android Studiju.
- **Prenošenjem fajla**: Pošalji `app-debug.apk` na telefon (email, Google Drive, Bluetooth) i otvori ga da instaliraš. Moraćeš dozvoliti instalaciju iz nepoznatih izvora.

---

## Struktura projekta

```
agenda-contactos/
├── public/                  # Statički fajlovi
│   ├── favicon.svg          # Ikonica u tabu pretraživača
│   └── manifest.json        # PWA konfiguracija (za instalaciju na mobilnom)
├── src/
│   ├── components/          # Komponente za višekratnu upotrebu
│   │   ├── ContactCard.tsx  # Kartica kontakta (prikazuje se u gridu)
│   │   └── Layout.tsx       # Zajedničko zaglavlje sa navigacijom i temom
│   ├── context/
│   │   └── AuthContext.tsx   # Logika autentifikacije i upravljanja ulogama
│   ├── lib/
│   │   ├── supabase.ts      # Konekcija na Supabase (čita iz .env)
│   │   └── types.ts         # TypeScript definicije tipova podataka
│   ├── pages/
│   │   ├── LoginPage.tsx          # Stranica za prijavu/registraciju
│   │   ├── ContactListPage.tsx    # Glavna stranica sa listom, pretragom i filterom
│   │   ├── ContactDetailPage.tsx  # Detalji kontakta sa akcijama (poziv, email, chat)
│   │   └── ContactFormPage.tsx    # Forma za kreiranje/izmjenu kontakta (samo admin)
│   ├── App.tsx              # Glavni ruter — definiše sve rute aplikacije
│   ├── main.tsx             # Ulazna tačka — renderuje App u DOM
│   └── index.css            # Tailwind CSS import i osnovni stilovi
├── supabase/
│   ├── schema.sql           # SQL šema baze, RLS politike i triggeri
│   └── seed.sql             # INSERT komande sa 30 kontakata iz CSV-a
├── .env.example             # Primjer varijabli okruženja
├── .env                     # Tvoje prave kredencijale (NE COMMITOVATI!)
├── .gitignore               # Fajlovi koje Git ignoriše (.env, node_modules, dist)
├── package.json             # Zavisnosti projekta i skripte
├── tsconfig.json            # TypeScript konfiguracija
└── vite.config.ts           # Vite konfiguracija (React plugin, Tailwind, port)
```

---

## Funkcionalnosti po ulogama

### USER (obični korisnik)

- Pregled svih kontakata u grid rasporedu
- Pretraga po imenu, prezimenu, emailu, telefonu ili poziciji
- Filtriranje po službi/odjeljenju (dropdown meni)
- Otvaranje detalja kontakta sa svim informacijama
- Direktno pozivanje broja telefona (link `tel:`)
- Direktno slanje emaila (link `mailto:`)
- Otvaranje WhatsApp razgovora
- Otvaranje Google Meet poziva
- Izvoz filtriranih kontakata u CSV fajl
- Prebacivanje između tamne i svijetle teme

### ADMIN (administrator)

Sve funkcionalnosti USER profila, plus:

- Dugme **+ Nuevo** za kreiranje novog kontakta
- Dugme **Editar** na stranici detalja kontakta za izmjenu podataka
- Dugme **Eliminar** za brisanje kontakta (sa potvrdom)
- Žuta oznaka **Admin** u zaglavlju koja potvrđuje admin pristup

---

## Rješavanje čestih problema

### "Faltan las variables de entorno..."
Nisi napravio `.env` fajl ili su vrijednosti pogrešne. Provjeri korak 3.3.

### Registracija ne radi / "Email not confirmed"
Nisi isključio potvrdu emaila. Provjeri korak 2.3.

### Prijavim se ali ne vidim kontakte
SQL fajlovi nijesu pokrenuti u Supabase-u. Provjeri korak 2.1 i 2.2.

### Ne vidim Admin dugmad
Nisi promovisao korisnika u admina. Provjeri korak 4.2. Obavezno se odjavi i ponovo prijavi nakon toga.

### `npm run dev` javlja grešku
Provjeri da li si pokrenuo `npm install` prvi. Ako i dalje ne radi, obriši `node_modules` i ponovo instaliraj:

```bash
rm -rf node_modules
npm install
```

### Port 5173 je zauzet
Ugasi prethodni server (`Ctrl+C`) ili promijeni port u `vite.config.ts`.
