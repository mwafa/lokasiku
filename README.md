# LOKASIKU

Api Untuk Regional Indoesia

# Install

```shell
npm install
npm start
```

# API Endpoint

Searching data menggunakan Fuzzy Search. Listen port default `90`

## Pencarian

### Provinsi

```
/prov?name=KEYWORD
```

**Example**:

**Request**: `localhost:90/prov?name=lam`

**Response**:

```json
{
  "results": [
    {
      "id": "18",
      "nama": "LAMPUNG"
    },
    {
      "id": "64",
      "nama": "KALIMANTAN TIMUR"
    }
  ]
}
```

### Kabupaten

```
/reg/[ID PROVINSI]?name=KEYWORD
```

**Example**:

**Request**: `localhost:90/reg/18?name=sel`

**Response**:

```json
{
  "results": [
    {
      "id": "1803",
      "nama": "KABUPATEN LAMPUNG SELATAN"
    }
  ]
}
```

### Kecamatan

```
/dis/[ID KABUPATEN]?name=KEYWORD
```

**Example**:

**Request**: `localhost:90/dis/1803?name=nat`

**Response**:

```json
{
  "results": [
    {
      "id": "1803060",
      "nama": "NATAR"
    }
  ]
}
```

---

## Single ID

**Endpoint**: /[ID KECAMATAN]

**Request**: `localhost:90/1803060`

**Response**:

```json
{
  "result": {
    "prov": {
      "id": "18",
      "nama": "LAMPUNG"
    },
    "reg": {
      "id": "1803",
      "nama": "KABUPATEN LAMPUNG SELATAN"
    }
  }
}
```

## ERROR

**Error response**:

```json
{
  "error": true,
  "message": "Some message here!"
}
```
