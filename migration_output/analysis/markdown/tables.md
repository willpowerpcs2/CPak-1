# Database Tables

## city names

Row count: 14

### Columns

| Name      | Type   |   Size | Nullable   |
|:----------|:-------|-------:|:-----------|
| city name | str    |     50 | Yes        |

### Indexes

- PrimaryKey: Unique (city name)

### Sample Data

|    | city name      |
|---:|:---------------|
|  0 | Albany         |
|  1 | Balston Lake   |
|  2 | Burnt Hills    |
|  3 | Clifton Park   |
|  4 | Delmar         |
|  5 | East Greenbush |
|  6 | Glenmont       |
|  7 | Guilderland    |
|  8 | Lathem         |
|  9 | Renselear      |

## data table

Row count: 26543

### Columns

| Name                      | Type     |   Size | Nullable   |
|:--------------------------|:---------|-------:|:-----------|
| Company name              | str      |     50 | Yes        |
| phone number              | str      |     50 | Yes        |
| zoning date               | datetime |     19 | Yes        |
| Cost for this month       | float    |     53 | Yes        |
| Balance due               | float    |     53 | Yes        |
| Check number 1            | str      |     50 | Yes        |
| Check amount 1            | float    |     53 | Yes        |
| Date check was received 1 | datetime |     19 | Yes        |
| Check number 2            | str      |     50 | Yes        |
| Check amount 2            | float    |     53 | Yes        |
| Date check was received 2 | datetime |     19 | Yes        |
| Check number 3            | str      |     50 | Yes        |
| Check amount 3            | float    |     53 | Yes        |
| Date check was received 3 | datetime |     19 | Yes        |
| Check number 4            | str      |     50 | Yes        |
| Check amount 4            | float    |     53 | Yes        |
| Date check was received 4 | datetime |     19 | Yes        |
| Amount Paid               | float    |     53 | Yes        |
| Zone 1                    | int      |     10 | Yes        |
| Zone 2                    | int      |     10 | Yes        |
| Zone 3                    | int      |     10 | Yes        |
| Zone 4                    | int      |     10 | Yes        |
| Zone 5                    | int      |     10 | Yes        |
| Zone 6                    | int      |     10 | Yes        |
| Zone 7                    | int      |     10 | Yes        |
| Zone 8                    | int      |     10 | Yes        |
| Zone 9                    | int      |     10 | Yes        |
| Zone 10                   | int      |     10 | Yes        |
| Zone 11                   | int      |     10 | Yes        |
| Zone 12                   | int      |     10 | Yes        |
| Zone 13                   | int      |     10 | Yes        |
| Zone 14                   | int      |     10 | Yes        |
| Zone 15                   | int      |     10 | Yes        |
| Zone 16                   | int      |     10 | Yes        |
| Zone Cost 1               | float    |     53 | Yes        |
| Zone Cost 2               | float    |     53 | Yes        |
| Zone Cost 3               | float    |     53 | Yes        |
| Zone Cost 4               | float    |     53 | Yes        |
| Zone Cost 5               | float    |     53 | Yes        |
| Zone Cost 6               | float    |     53 | Yes        |
| Zone Cost 7               | float    |     53 | Yes        |
| Zone Cost 8               | float    |     53 | Yes        |
| Zone Cost 9               | float    |     53 | Yes        |
| Zone Cost 10              | float    |     53 | Yes        |
| Zone Cost 11              | float    |     53 | Yes        |
| Zone Cost 12              | float    |     53 | Yes        |
| Zone Cost 13              | float    |     53 | Yes        |
| Zone Cost 14              | float    |     53 | Yes        |
| Zone Cost 15              | float    |     53 | Yes        |
| Zone Cost 16              | float    |     53 | Yes        |
| sent                      | bool     |      1 | No         |
| DateSent                  | datetime |     19 | Yes        |

### Indexes

- PrimaryKey: Unique (Company name, phone number, zoning date)
- Company name: Non-unique (Company name)
- phone number: Non-unique (phone number)
- Reference: Non-unique (Company name, phone number)
- selected: Non-unique (sent)

### Sample Data

|    | Company name   |   phone number | zoning date         |   Cost for this month |   Balance due |   Check number 1 |   Check amount 1 | Date check was received 1   | Check number 2   |   Check amount 2 | Date check was received 2   | Check number 3   |   Check amount 3 | Date check was received 3   | Check number 4   |   Check amount 4 | Date check was received 4   |   Amount Paid | Zone 1   | Zone 2   | Zone 3   |   Zone 4 | Zone 5   | Zone 6   | Zone 7   | Zone 8   | Zone 9   | Zone 10   | Zone 11   |   Zone 12 | Zone 13   | Zone 14   | Zone 15   |   Zone 16 |   Zone Cost 1 |   Zone Cost 2 |   Zone Cost 3 |   Zone Cost 4 |   Zone Cost 5 |   Zone Cost 6 |   Zone Cost 7 |   Zone Cost 8 |   Zone Cost 9 |   Zone Cost 10 |   Zone Cost 11 |   Zone Cost 12 |   Zone Cost 13 |   Zone Cost 14 |   Zone Cost 15 |   Zone Cost 16 | sent   | DateSent   |
|---:|:---------------|---------------:|:--------------------|----------------------:|--------------:|-----------------:|-----------------:|:----------------------------|:-----------------|-----------------:|:----------------------------|:-----------------|-----------------:|:----------------------------|:-----------------|-----------------:|:----------------------------|--------------:|:---------|:---------|:---------|---------:|:---------|:---------|:---------|:---------|:---------|:----------|:----------|----------:|:----------|:----------|:----------|----------:|--------------:|--------------:|--------------:|--------------:|--------------:|--------------:|--------------:|--------------:|--------------:|---------------:|---------------:|---------------:|---------------:|---------------:|---------------:|---------------:|:-------|:-----------|
|  0 | 16 HANDLES     |        9820659 | 2022-04-19 00:00:00 |                   650 |             0 |             4044 |              650 | 2022-05-23 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           650 |          |          |          |       -1 |          |          |          |          |          |           |           |       nan |           |           |           |         0 |             0 |             0 |             0 |           650 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |              0 |              0 |              0 |              0 | False  |            |
|  1 | 16 HANDLES     |        9820659 | 2022-05-23 00:00:00 |                   650 |             0 |             4050 |              650 | 2022-06-06 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           650 |          |          |          |      nan |          |          |          |          |          |           |           |        -1 |           |           |           |         0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |            650 |              0 |              0 |              0 |              0 | False  |            |
|  2 | 16 HANDLES     |        9820659 | 2022-07-06 00:00:00 |                   475 |             0 |             4082 |              475 | 2022-09-13 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           475 |          |          |          |       -1 |          |          |          |          |          |           |           |       nan |           |           |           |         0 |             0 |             0 |             0 |           475 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |              0 |              0 |              0 |              0 | False  |            |
|  3 | 16 HANDLES     |        9820659 | 2023-04-19 00:00:00 |                   695 |             0 |             4177 |              695 | 2023-05-12 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           695 |          |          |          |       -1 |          |          |          |          |          |           |           |       nan |           |           |           |         0 |             0 |             0 |             0 |           695 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |              0 |              0 |              0 |              0 | False  |            |
|  4 | 16 HANDLES     |        9820659 | 2023-06-02 00:00:00 |                   695 |             0 |             4187 |              695 | 2023-06-15 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           695 |          |          |          |      nan |          |          |          |          |          |           |           |        -1 |           |           |           |         0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |            695 |              0 |              0 |              0 |              0 | False  |            |
|  5 | 16 HANDLES     |        9820659 | 2023-08-02 00:00:00 |                   695 |             0 |             4209 |              695 | 2023-08-09 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           695 |          |          |          |       -1 |          |          |          |          |          |           |           |       nan |           |           |           |         0 |             0 |             0 |             0 |           695 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |              0 |              0 |              0 |              0 | False  |            |
|  6 | 16 HANDLES     |        9820659 | 2023-09-12 00:00:00 |                   695 |             0 |             4225 |              695 | 2023-09-25 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           695 |          |          |          |      nan |          |          |          |          |          |           |           |        -1 |           |           |           |         0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |            695 |              0 |              0 |              0 |              0 | False  |            |
|  7 | 16 HANDLES     |        9820659 | 2023-11-06 00:00:00 |                   695 |             0 |             4245 |              695 | 2023-11-30 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           695 |          |          |          |       -1 |          |          |          |          |          |           |           |       nan |           |           |           |         0 |             0 |             0 |             0 |           695 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |              0 |              0 |              0 |              0 | False  |            |
|  8 | 16 HANDLES     |        9820659 | 2024-01-26 00:00:00 |                   475 |             0 |             4262 |              475 | 2024-02-07 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           475 |          |          |          |       -1 |          |          |          |          |          |           |           |       nan |           |           |           |         0 |             0 |             0 |             0 |           475 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |              0 |              0 |              0 |              0 | False  |            |
|  9 | 16 HANDLES     |        9820659 | 2024-03-25 00:00:00 |                   695 |             0 |             4287 |              695 | 2024-04-10 00:00:00         |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           695 |          |          |          |      nan |          |          |          |          |          |           |           |        -1 |           |           |           |         0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |            695 |              0 |              0 |              0 |              0 | False  |            |

## ink and paper color

Row count: 4063

### Columns

| Name         | Type     |   Size | Nullable   |
|:-------------|:---------|-------:|:-----------|
| Paper color  | str      |     50 | Yes        |
| Ink color    | str      |     50 | Yes        |
| zone number  | str      |    255 | Yes        |
| zone date    | datetime |     19 | Yes        |
| company name | str      |     50 | Yes        |
| phone number | str      |     50 | Yes        |

### Indexes

- PrimaryKey: Unique (zone number, zone date, company name, phone number)
- company name: Non-unique (company name)
- Reference1: Non-unique (company name, phone number)

### Sample Data

|    | Paper color   | Ink color      |   zone number | zone date           | company name           |   phone number |
|---:|:--------------|:---------------|--------------:|:--------------------|:-----------------------|---------------:|
|  0 | GOLDEN        | RED/BLK        |             1 | 1995-01-01 00:00:00 | CAPITAL CHOICE TV      |        8997501 |
|  1 | IVORY         | R/GR           |             1 | 1995-03-01 00:00:00 | BURNT HILLS BOOKS      |        3997004 |
|  2 | CANARY        | R/BLK          |             1 | 1995-03-01 00:00:00 | CAPITAL CHOICE TV      |        8997501 |
|  3 | PINK          | RHOD/TEAL      |             1 | 1995-03-01 00:00:00 | COAKLEY HOME TEXTILES  |        3828371 |
|  4 | WHITE         | RHOD/TEAL CARD |             1 | 1995-03-01 00:00:00 | DARLING LIMO           |        3722508 |
|  5 | CANARY        | R/BLUE         |             1 | 1995-03-01 00:00:00 | DINO S PIZZA           |        3991622 |
|  6 | BUFF          | BORD/BLK       |             1 | 1995-03-01 00:00:00 | DR. JUDD LESSER        |        3740385 |
|  7 | PINK          | TEAL/RHOD      |             1 | 1995-03-01 00:00:00 | FRANK GALLO FLORIST    |        3466171 |
|  8 | CHERRY        | BLUE           |             1 | 1995-03-01 00:00:00 | GAIL KING ELECTROLYSIS |        3821591 |
|  9 | GOLDEN        | BORD/BLK       |             1 | 1995-03-01 00:00:00 | GENE S CLEANING        |        3712462 |

## main_table

Row count: 3265

### Columns

| Name              | Type     |   Size | Nullable   |
|:------------------|:---------|-------:|:-----------|
| Company Name      | str      |     50 | Yes        |
| ID                | int      |     10 | Yes        |
| reminder merchant | int      |     10 | Yes        |
| Name              | str      |     50 | Yes        |
| Street Address    | str      |     50 | Yes        |
| City              | str      |     50 | Yes        |
| State             | str      |      2 | Yes        |
| Zip code          | str      |     50 | Yes        |
| fax number        | str      |     50 | Yes        |
| phone number      | str      |     50 | Yes        |
| toggle button     | str      |     50 | Yes        |
| type of business  | str      |    100 | Yes        |
| active            | bool     |      1 | No         |
| sent              | bool     |      1 | No         |
| CustomerID        | int      |     10 | No         |
| Do not Bank Bill  | bool     |      1 | No         |
| Bank Help Notice  | bool     |      1 | No         |
| sentdate          | datetime |     19 | Yes        |

### Indexes

- PrimaryKey: Unique (Company Name, phone number)
- Company Name: Non-unique (Company Name)
- CustomerID: Non-unique (CustomerID)
- selected: Non-unique (sent)

### Sample Data

|    | Company Name         | ID   | reminder merchant   | Name           | Street Address    | City         | State   |   Zip code | fax number   |   phone number | toggle button   | type of business   | active   | sent   |   CustomerID | Do not Bank Bill   | Bank Help Notice   | sentdate            |
|---:|:---------------------|:-----|:--------------------|:---------------|:------------------|:-------------|:--------|-----------:|:-------------|---------------:|:----------------|:-------------------|:---------|:-------|-------------:|:-------------------|:-------------------|:--------------------|
|  0 | 16 HANDLES           |      |                     | MELISSA        | 5 SOUTHSIDE DR    | Clifton Park | NY      |      12065 |              |        9820659 |                 | ICE CREAM          | True     | False  |         3238 | False              | False              | NaT                 |
|  1 | 16 HANDLES 7         |      |                     | PETE           | 380 RT. 9W        | Glenmont     | NY      |      12077 |              |        4346000 |                 | ICE CRREAM         | True     | False  |         3440 | False              | False              | NaT                 |
|  2 | 168 BLISS NAILS      |      |                     | TINA/LEE       | 1505 RT. 9        | Clifton Park | NY      |      12065 |              |        3710481 |                 | NAILS              | True     | False  |         3348 | False              | False              | NaT                 |
|  3 | 20 MALL              |      |                     | WALTER         | 2080 WESTERN AVE  | Guilderland  | NY      |      12084 |              |        8695030 |                 | MALL               | False    | True   |         1021 | False              | False              | 2002-05-08 08:21:14 |
|  4 | 21st CENTURY FITNESS |      |                     | JOE            | 4852 ST.HWY 30    | AMSTERDAM    | NY      |      12010 |              |        8435530 |                 | FITNESS            | False    | True   |          957 | False              | False              | 2001-10-02 22:20:08 |
|  5 | 3 BROTHERS PIZZERIA  |      |                     | MADASSAR MUNIR | 1615 BROADWAY     | Watervliet   | NY      |      12189 |              |        2383448 |                 | FOOD               | True     | False  |         3271 | False              | False              | NaT                 |
|  6 | 40 OAK GRILL         |      |                     | MAUREEN        | 925 RT. 9         | QUEENSBURY   | NY      |      12804 |              |        7410331 |                 | FOOD               | True     | False  |         3192 | False              | False              | NaT                 |
|  7 | 42 DEGREES           |      |                     | ROBIN          | 206 GLEN ST       | GLENS FALLS  | NY      |      12801 |              |        2230403 |                 | SMOKING ACCES.     | True     | False  |         3145 | False              | False              | NaT                 |
|  8 | 4U NAIL PLACE        |      |                     | ACCTS. PAYABLE | 362 NORTHERN BLVD | Albany       | NY      |      12204 |              |        4363458 |                 | NAILS              | True     | False  |         2305 | False              | False              | NaT                 |
|  9 | 518 DONUTS           |      |                     | SAM            | 7 SOUTHSIDE DR    | Clifton Park | NY      |      12065 |              |        9336688 |                 | DONUTS             | True     | False  |         3221 | False              | False              | NaT                 |

## months

Row count: 12

### Columns

| Name         | Type   |   Size | Nullable   |
|:-------------|:-------|-------:|:-----------|
| Month Number | int    |      3 | Yes        |
| Month Name   | str    |     50 | Yes        |

### Indexes

- PrimaryKey: Unique (Month Number, Month Name)

### Sample Data

|    |   Month Number | Month Name   |
|---:|---------------:|:-------------|
|  0 |              1 | January      |
|  1 |              2 | Febuary      |
|  2 |              3 | March        |
|  3 |              4 | April        |
|  4 |              5 | May          |
|  5 |              6 | June         |
|  6 |              7 | July         |
|  7 |              8 | August       |
|  8 |              9 | September    |
|  9 |             10 | October      |

## NotBankBillable

Row count: 25

### Columns

| Name             | Type     |   Size | Nullable   |
|:-----------------|:---------|-------:|:-----------|
| Balance due      | float    |     53 | Yes        |
| zoning date      | datetime |     19 | Yes        |
| Company Name     | str      |     50 | Yes        |
| Street Address   | str      |     50 | Yes        |
| City             | str      |     50 | Yes        |
| State            | str      |      2 | Yes        |
| Zip code         | str      |     50 | Yes        |
| Zone 1           | int      |     10 | Yes        |
| Zone 2           | int      |     10 | Yes        |
| Zone 3           | int      |     10 | Yes        |
| Zone 4           | int      |     10 | Yes        |
| Zone 5           | int      |     10 | Yes        |
| Zone 6           | int      |     10 | Yes        |
| Zone 7           | int      |     10 | Yes        |
| Zone 8           | int      |     10 | Yes        |
| Zone 9           | int      |     10 | Yes        |
| Zone 10          | int      |     10 | Yes        |
| Zone 11          | int      |     10 | Yes        |
| Zone 12          | int      |     10 | Yes        |
| Zone 13          | int      |     10 | Yes        |
| Zone 14          | int      |     10 | Yes        |
| Zone 15          | int      |     10 | Yes        |
| Do not Bank Bill | bool     |      1 | No         |
| nName            | str      |     50 | Yes        |
| Serious          | str      |    255 | Yes        |
| Selected         | str      |    255 | Yes        |

### Sample Data

|    |   Balance due | zoning date         | Company Name             | Street Address    | City         | State   |   Zip code | Zone 1   |   Zone 2 | Zone 3   |   Zone 4 |   Zone 5 |   Zone 6 |   Zone 7 | Zone 8   | Zone 9   |   Zone 10 | Zone 11   |   Zone 12 |   Zone 13 | Zone 14   | Zone 15   | Do not Bank Bill   | nName          | Serious   |   Selected |
|---:|--------------:|:--------------------|:-------------------------|:------------------|:-------------|:--------|-----------:|:---------|---------:|:---------|---------:|---------:|---------:|---------:|:---------|:---------|----------:|:----------|----------:|----------:|:----------|:----------|:-------------------|:---------------|:----------|-----------:|
|  0 |           695 | 2024-11-08 00:00:00 | ROTTERDAM HEAT           | 3101 THOMPSON ST. | SCHENECTADY  | NY      |      12306 |          |       -1 |          |      nan |      nan |      nan |      nan |          |          |       nan |           |       nan |       nan |           |           | True               | JOANNE         |           |         -1 |
|  1 |           725 | 2024-09-06 00:00:00 | SORRENTINOS DELI         | 241 GROOMS RD     | Clifton Park | NY      |      12065 |          |      nan |          |      nan |      nan |      nan |      nan |          |          |        -1 |           |       nan |       nan |           |           | True               | RICH           |           |         -1 |
|  2 |           475 | 2024-09-26 00:00:00 | SORRENTINOS DELI         | 241 GROOMS RD     | Clifton Park | NY      |      12065 |          |      nan |          |      nan |      nan |       -1 |      nan |          |          |       nan |           |       nan |       nan |           |           | True               | RICH           |           |         -1 |
|  3 |           725 | 2024-09-30 00:00:00 | SORRENTINOS DELI         | 241 GROOMS RD     | Clifton Park | NY      |      12065 |          |      nan |          |      nan |      nan |      nan |      nan |          |          |       nan |           |        -1 |       nan |           |           | True               | RICH           |           |         -1 |
|  4 |           725 | 2024-10-24 00:00:00 | SORRENTINOS DELI         | 241 GROOMS RD     | Clifton Park | NY      |      12065 |          |      nan |          |       -1 |      nan |      nan |      nan |          |          |       nan |           |       nan |       nan |           |           | True               | RICH           |           |         -1 |
|  5 |           725 | 2024-11-22 00:00:00 | SORRENTINOS DELI         | 241 GROOMS RD     | Clifton Park | NY      |      12065 |          |      nan |          |      nan |      nan |      nan |      nan |          |          |       nan |           |       nan |        -1 |           |           | True               | RICH           |           |         -1 |
|  6 |           500 | 2024-10-15 00:00:00 | UNIVERSITY WINE & LIQUOR | 1225 WESTERN AVE  | Albany       | NY      |      12203 |          |      nan |          |      nan |       -1 |      nan |      nan |          |          |       nan |           |       nan |       nan |           |           | True               | ACCTS. PAYABLE |           |         -1 |
|  7 |           725 | 2024-07-26 00:00:00 | MIDAS AUTO SERVICE       | 1101 MONROE ST.   | TOLEDO       | OH      |      43604 |          |       -1 |          |      nan |      nan |      nan |      nan |          |          |       nan |           |       nan |       nan |           |           | True               | KEVIN MEIDT    |           |         -1 |
|  8 |           725 | 2024-09-03 00:00:00 | MIDAS AUTO SERVICE       | 1101 MONROE ST.   | TOLEDO       | OH      |      43604 |          |      nan |          |      nan |      nan |      nan |       -1 |          |          |       nan |           |       nan |       nan |           |           | True               | KEVIN MEIDT    |           |         -1 |
|  9 |           725 | 2024-09-06 00:00:00 | MIDAS AUTO SERVICE       | 1101 MONROE ST.   | TOLEDO       | OH      |      43604 |          |      nan |          |      nan |      nan |      nan |      nan |          |          |        -1 |           |       nan |       nan |           |           | True               | KEVIN MEIDT    |           |         -1 |

## old_data table as of 10/22/95

Row count: 526

### Columns

| Name                      | Type     |   Size | Nullable   |
|:--------------------------|:---------|-------:|:-----------|
| ID                        | int      |     10 | Yes        |
| Company name              | str      |    255 | Yes        |
| zoning date               | datetime |     19 | Yes        |
| Cost for this month       | float    |     53 | Yes        |
| Balance due               | float    |     53 | Yes        |
| Check number 1            | str      |    255 | Yes        |
| Check amount 1            | float    |     53 | Yes        |
| Date check was received 1 | str      |    255 | Yes        |
| Check number 2            | str      |    255 | Yes        |
| Check amount 2            | float    |     53 | Yes        |
| Date check was received 2 | str      |    255 | Yes        |
| Check number 3            | str      |    255 | Yes        |
| Check amount 3            | float    |     53 | Yes        |
| Date check was received 3 | str      |    255 | Yes        |
| Check number 4            | str      |    255 | Yes        |
| Check amount 4            | float    |     53 | Yes        |
| Date check was received 4 | str      |    255 | Yes        |
| Amount Paid               | float    |     53 | Yes        |
| Zone 1                    | int      |     10 | Yes        |
| Zone 2                    | int      |     10 | Yes        |
| Zone 3                    | int      |     10 | Yes        |
| Zone 4                    | int      |     10 | Yes        |
| Zone 5                    | int      |     10 | Yes        |
| Zone 6                    | int      |     10 | Yes        |
| Zone 7                    | int      |     10 | Yes        |
| Zone 8                    | int      |     10 | Yes        |
| Zone 9                    | int      |     10 | Yes        |
| Zone 10                   | int      |     10 | Yes        |
| Zone 11                   | int      |     10 | Yes        |
| Zone 12                   | int      |     10 | Yes        |
| Zone Cost 1               | float    |     53 | Yes        |
| Zone Cost 2               | float    |     53 | Yes        |
| Zone Cost 3               | float    |     53 | Yes        |
| Zone Cost 4               | float    |     53 | Yes        |
| Zone Cost 5               | float    |     53 | Yes        |
| Zone Cost 6               | float    |     53 | Yes        |
| Zone Cost 7               | float    |     53 | Yes        |
| Zone Cost 8               | float    |     53 | Yes        |
| Zone Cost 9               | float    |     53 | Yes        |
| Zone Cost 10              | float    |     53 | Yes        |
| Zone Cost 11              | float    |     53 | Yes        |
| Zone Cost 12              | float    |     53 | Yes        |

### Sample Data

|    |   ID | Company name        | zoning date         |   Cost for this month |   Balance due | Check number 1   |   Check amount 1 | Date check was received 1   | Check number 2   |   Check amount 2 | Date check was received 2   | Check number 3   |   Check amount 3 | Date check was received 3   | Check number 4   |   Check amount 4 | Date check was received 4   |   Amount Paid |   Zone 1 |   Zone 2 |   Zone 3 |   Zone 4 |   Zone 5 |   Zone 6 |   Zone 7 |   Zone 8 |   Zone 9 |   Zone 10 |   Zone 11 |   Zone 12 |   Zone Cost 1 |   Zone Cost 2 |   Zone Cost 3 |   Zone Cost 4 |   Zone Cost 5 |   Zone Cost 6 |   Zone Cost 7 |   Zone Cost 8 |   Zone Cost 9 |   Zone Cost 10 |   Zone Cost 11 |   Zone Cost 12 |
|---:|-----:|:--------------------|:--------------------|----------------------:|--------------:|:-----------------|-----------------:|:----------------------------|:-----------------|-----------------:|:----------------------------|:-----------------|-----------------:|:----------------------------|:-----------------|-----------------:|:----------------------------|--------------:|---------:|---------:|---------:|---------:|---------:|---------:|---------:|---------:|---------:|----------:|----------:|----------:|--------------:|--------------:|--------------:|--------------:|--------------:|--------------:|--------------:|--------------:|--------------:|---------------:|---------------:|---------------:|
|  0 |   98 | DARLING LIMO        | 1995-01-01 00:00:00 |                   475 |             0 | N/A              |              475 |                             |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           475 |        0 |        0 |        0 |        1 |        0 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           475 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |
|  1 |   99 | ROTTERDAM HEAT      | 1995-01-01 00:00:00 |                   990 |             0 | N/A              |              485 |                             | N/A              |              505 |                             |                  |                0 |                             |                  |                0 |                             |           990 |        0 |        0 |        0 |        1 |       -1 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           485 |           505 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |
|  2 |  100 | CURTIS ELECTROLYSIS | 1995-01-01 00:00:00 |                  1460 |             0 | N/A              |              520 |                             | N/A              |              470 |                             | N/A              |              470 |                             |                  |                0 |                             |          1460 |        0 |       -1 |        0 |        1 |        1 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |           470 |             0 |           520 |           470 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |
|  3 |  102 | MILLER PAINT        | 1995-01-01 00:00:00 |                   475 |             0 | 6983             |              475 |                             |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           475 |        0 |        0 |        0 |        1 |        0 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           475 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |
|  4 |  103 | FRAME & ART SHOP    | 1995-01-01 00:00:00 |                   485 |             0 | N/A              |              485 |                             |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           485 |        0 |        0 |        0 |        1 |        0 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           485 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |
|  5 |  105 | CABINET DOCTOR      | 1995-01-01 00:00:00 |                   475 |           275 | N/A              |              200 |                             |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           200 |        0 |        0 |        0 |        1 |        0 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           475 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |
|  6 |  106 | QVS DRY CLEANING    | 1995-01-01 00:00:00 |                   510 |             0 | N/A              |              510 |                             |                  |                0 |                             |                  |                0 |                             |                  |                0 |                             |           510 |        0 |        0 |        0 |        1 |        0 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           510 |             0 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |
|  7 |  107 | GENE'S CLEANING     | 1995-01-01 00:00:00 |                   990 |             0 | N/A              |              485 |                             | N/A              |              505 |                             |                  |                0 |                             |                  |                0 |                             |           990 |        0 |        0 |        0 |        1 |       -1 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           485 |           505 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |
|  8 |  108 | M & W WINDOW        | 1995-01-01 00:00:00 |                  1705 |             0 | N/A              |              555 |                             | N/A              |              575 |                             | N/A              |              575 |                             |                  |                0 |                             |          1705 |        0 |        0 |        0 |        1 |       -1 |       -1 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           555 |           575 |           575 |             0 |             0 |             0 |              0 |              0 |              0 |
|  9 |  109 | MR. SUBB            | 1995-01-01 00:00:00 |                  1040 |             0 | N/A              |              510 |                             | NA               |              530 |                             |                  |                0 |                             |                  |                0 |                             |          1040 |        0 |        0 |        0 |        1 |       -1 |        0 |        0 |        0 |        0 |         0 |         0 |         0 |             0 |             0 |             0 |           510 |           530 |             0 |             0 |             0 |             0 |              0 |              0 |              0 |

## old_ink and paper color as of 10/22/95

Row count: 628

### Columns

| Name         | Type     |   Size | Nullable   |
|:-------------|:---------|-------:|:-----------|
| Paper color  | str      |    255 | Yes        |
| Ink color    | str      |    255 | Yes        |
| zone number  | str      |    255 | Yes        |
| zone date    | datetime |     19 | Yes        |
| company name | str      |    255 | Yes        |
| id           | int      |     10 | Yes        |

### Sample Data

|    | Paper color   | Ink color   |   zone number | zone date           | company name       |   id |
|---:|:--------------|:------------|--------------:|:--------------------|:-------------------|-----:|
|  0 | GOLDEN        | RED/BLK     |             1 | 1995-01-01 00:00:00 | CAPITAL CHOICE TV  |   25 |
|  1 | pink          | rhod/blk    |             4 | 1995-01-01 00:00:00 | MARKS  AUTO        |   32 |
|  2 | BLUE          | R/BLUE      |             4 | 1995-01-01 00:00:00 | EMPRESS TRAVEL     |   33 |
|  3 | GREEN         | GR/BLK      |             4 | 1995-01-01 00:00:00 | HOFF JEWELRY       |   34 |
|  4 | SALMON        | TEAL/BLK    |             4 | 1995-01-01 00:00:00 | TAI PAN RESTAURANT |   36 |
|  5 | LILAC         | TEAL/BLK    |             4 | 1995-01-01 00:00:00 | JAZZERCISE         |   37 |
|  6 | GOLDEN        | R/BLK       |             4 | 1995-01-01 00:00:00 | 1/1/95             |   39 |
|  7 | IVORY         | GR/BLK      |             4 | 1995-01-01 00:00:00 | PERSNICKETY'S      |   40 |
|  8 | IVORY         | GR/BLK      |             4 | 1995-01-01 00:00:00 | TCBY YOGURT        |   41 |
|  9 | BUFF          | BORD/BLK    |             4 | 1995-01-01 00:00:00 | DEANGELUS LAW FIRM |   43 |

## old_main as of 10/22/95

Row count: 240

### Columns

| Name              | Type   |   Size | Nullable   |
|:------------------|:-------|-------:|:-----------|
| ID                | int    |     10 | Yes        |
| Company Name      | str    |    255 | Yes        |
| reminder merchant | int    |     10 | Yes        |
| Name              | str    |    255 | Yes        |
| Street Address    | str    |    255 | Yes        |
| City              | str    |    255 | Yes        |
| State             | str    |    255 | Yes        |
| Zip code          | str    |    255 | Yes        |
| fax number        | str    |    255 | Yes        |
| phone number      | str    |    255 | Yes        |
| toggle button     | str    |    255 | Yes        |
| type of business  | str    |    255 | Yes        |

### Sample Data

|    |   ID | Company Name       |   reminder merchant | Name            | Street Address        | City         | State   |   Zip code |   fax number |   phone number | toggle button   | type of business   |
|---:|-----:|:-------------------|--------------------:|:----------------|:----------------------|:-------------|:--------|-----------:|-------------:|---------------:|:----------------|:-------------------|
|  0 |   40 | PC Trainers        |                   0 | Michael Perrego | 240 Manning Blvd      | Albany       | NY      |      12206 |              |        4582660 |                 | Computer Training  |
|  1 |   41 | CAPITAL CHOICE TV  |                   0 | DAVID BROWN     | 7 HEMPHILL PLACE      | BALLSTON SPA | NY      |      12020 |   5188999456 |        8997501 |                 | WIRELESS TV        |
|  2 |   42 | MAMA'S PIZZA       |                   0 | STEPHANIE       | RT.146                | CLIFTON PARK | NY      |      12065 |              |        3717313 |                 | PIZZA              |
|  3 |   46 | OLDE DATER TAVERN  |                   0 | JEANNIE         | RT.9                  | CLIFTON Park | NY      |      12065 |   0000000000 |        8777225 |                 | RESTAURANT         |
|  4 |   47 | FANTASTIC SAM'S 1  |                   0 | NANCY DONE      | 2 LONGVIEW COURT      | CLifton Park | NY      |      12065 |   0000000000 |        3831629 |                 | HAIR               |
|  5 |   48 | MARKS  AUTO        |                   0 | MARK            | 1019 RT.146           | clifton Park | NY      |      12065 |              |        3712397 |                 | AUTO               |
|  6 |   49 | HOFF JEWELRY       |                   0 | ERIC            | 1603 RT.9             | CLifton Park | NY      |      12065 |              |        3738645 |                 | JEWELRY            |
|  7 |   51 | EMPRESS TRAVEL     |                   0 | TOM KENT        | 54 THE CROSSING BLVD. | CLifton Park | NY      |      12065 |              |        5832929 |                 | TRAVEL             |
|  8 |   53 | ACCENT ON HEALTH   |                   0 | STEVE BURKE     | RT.9                  | CLifton Park | NY      |      12065 |              |        3830225 |                 | HEALTH CLUB        |
|  9 |   54 | TAI PAN RESTAURANT |                   0 | STEVE/DANNY     | 1519 RT.9             | CLifton Park | NY      |      12065 |              |        3838581 |                 | CHINESE RESTAURANT |

## reminder_table

Row count: 12

### Columns

| Name             | Type     |       Size | Nullable   |
|:-----------------|:---------|-----------:|:-----------|
| company_name     | str      |         50 | Yes        |
| phone_number     | str      |         50 | Yes        |
| contact_name     | str      |         50 | Yes        |
| type_of_business | str      |         50 | Yes        |
| zone             | str      |         50 | Yes        |
| month_date       | datetime |         19 | Yes        |
| information      | str      | 1073741823 | Yes        |
| city             | str      |         50 | Yes        |
| state            | str      |         50 | Yes        |
| zip              | str      |         50 | Yes        |
| street           | str      |         50 | Yes        |
| key              | int      |         10 | No         |

### Indexes

- PrimaryKey: Unique (key)
- Company name: Non-unique (company_name)
- phone number: Non-unique (phone_number)

### Sample Data

|    | company_name      |   phone_number | contact_name     | type_of_business   | zone   | month_date   | information                              | city   | state   | zip   | street   |   key |
|---:|:------------------|---------------:|:-----------------|:-------------------|:-------|:-------------|:-----------------------------------------|:-------|:--------|:------|:---------|------:|
|  0 |                   |     7188643545 | GRACE            | NAILS              | 8      |              | CALL FOR ANY SALON OPENING IN ALB.       |        |         |       |          |   362 |
|  1 | NAIL SALON        |     6464653272 | HELEN            | NAILS              | 8      |              |                                          |        |         |       |          |   453 |
|  2 |                   |     5189350431 | LAURIE           | DENTIST            | 10     |              | CALL FOR DEC. MAILING                    |        |         |       |          |   456 |
|  3 | BRUNSWICK DENTAL  |     5185338975 | DAWN CLARK       | DENTAL             |        |              | CALL FIRST IF WE OPEN TROY GENNBUSH AREA |        |         |       |          |   464 |
|  4 | HUMANA MEDICAL    |     5182276012 | RENEE            | MEDICAL INS.       | 9      |              | CALL FOR NEXT ZONE 9 MAILING.            |        |         |       |          |   482 |
|  5 | GLENMONT NAIL SPA |     7188643545 | GRACE            | NAIL SALON         | 7      |              | CALL FOR APRIL MAILING                   |        |         |       |          |   483 |
|  6 | ADK DENTAL        |     5183714131 | NICOLE           | DENTAL             | 4/12   |              | CALL ASAP IF AVAILABLE                   |        |         |       |          |   487 |
|  7 | BENSEN ROOFING    |     5184194837 | SERGE            | ROOFING            |        |              | CALL FOR ANY ZONE THAT OPENS UP          |        |         |       |          |   491 |
|  8 |                   |     9174067412 | TOM SMITH SMITTY | SOLAR              |        |              | CALL FOR FUTURE MAILINGS                 |        |         |       |          |   500 |
|  9 | GENERAL ASPHALT   |     8609898480 | JACOB STANLEY    |                    |        |              | CALL LATEJAN./FEB.FOR CONCRETE           |        |         |       |          |   501 |

## T053000A

Row count: 97

### Columns

| Name   | Type   |   Size | Nullable   |
|:-------|:-------|-------:|:-----------|
| Field1 | str    |    255 | Yes        |
| Field2 | str    |    255 | Yes        |
| Field3 | int    |     10 | Yes        |
| Field4 | str    |    255 | Yes        |
| Field5 | str    |    255 | Yes        |
| Field6 | str    |    255 | Yes        |
| Field7 | str    |    255 | Yes        |
| Field8 | str    |    255 | Yes        |

### Sample Data

|    |   Field1 | Field2   |   Field3 | Field4     | Field5    | Field6   |   Field7 | Field8                  |
|---:|---------:|:---------|---------:|:-----------|:----------|:---------|---------:|:------------------------|
|  0 |       02 | CONPA01  |       57 | 05/30/2000 | 053000-1  | INV      |      143 | Zone 11-4/10/00-$143.00 |
|  1 |       02 | CONPA01  |       64 | 05/30/2000 | 053000-2  | INV      |      540 | Zone 10-5/24/00-$540.00 |
|  2 |       02 | CONPA01  |       76 | 05/30/2000 | 053000-3  | INV      |      575 | Zone 11-4/10/00-$575.00 |
|  3 |       02 | CONPA01  |      107 | 05/30/2000 | 053000-4  | INV      |      360 | Zone 8-4/28/00-$360.00  |
|  4 |       02 | CONPA01  |      137 | 05/30/2000 | 053000-5  | INV      |      383 | Zone 5-4/19/00-$383.00  |
|  5 |       02 | CONPA01  |      183 | 05/30/2000 | 053000-6  | INV      |      675 | Zone 10-5/24/00-$675.00 |
|  6 |       02 | CONPA01  |      184 | 05/30/2000 | 053000-7  | INV      |      650 | Zone 9-5/11/00-$650.00  |
|  7 |       02 | CONPA01  |      184 | 05/30/2000 | 053000-8  | INV      |      650 | Zone 4-5/26/00-$650.00  |
|  8 |       02 | CONPA01  |      186 | 05/30/2000 | 053000-9  | INV      |      575 | Zone 6-2/21/00-$575.00  |
|  9 |       02 | CONPA01  |      191 | 05/30/2000 | 053000-10 | INV      |      575 | Zone 10-5/24/00-$575.00 |

## tblOverdueReports2030

Row count: 32

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |
| Zone 13        | int      |     10 | Yes        |
| Zone 14        | int      |     10 | Yes        |
| Zone 15        | int      |     10 | Yes        |
| Selected       | str      |    255 | Yes        |

### Sample Data

|    |   Balance due | zoning date         | Company Name        | Street Address           | City             | State   |   Zip code | Zone 1   | Zone 2   | Zone 3   | Zone 4   | Zone 5   | Zone 6   |   Zone 7 | Zone 8   | Zone 9   |   Zone 10 | Zone 11   | Zone 12   | Zone 13   | Zone 14   | Zone 15   |   Selected |
|---:|--------------:|:--------------------|:--------------------|:-------------------------|:-----------------|:--------|-----------:|:---------|:---------|:---------|:---------|:---------|:---------|---------:|:---------|:---------|----------:|:----------|:----------|:----------|:----------|:----------|-----------:|
|  0 |           750 | 2024-12-16 00:00:00 | COLONIAL CAR WASH   | 4017B STATE ST.          | SChenectady      | NY      |      12304 |          |          |          |          |          |          |       -1 |          |          |       nan |           |           |           |           |           |          0 |
|  1 |           790 | 2024-12-18 00:00:00 | FEIGENBAUM CLEANERS | 89 1/2 BAY ST.           | GLENS FALLS      | NY      |      12801 |          |          |          |          |          |          |      nan |          |          |        -1 |           |           |           |           |           |         -1 |
|  2 |           725 | 2024-12-16 00:00:00 | MAYFAIR JEWELERS    | 7 GLENRIDGE RD           | Scotia           | NY      |      12302 |          |          |          |          |          |          |       -1 |          |          |       nan |           |           |           |           |           |          0 |
|  3 |           695 | 2024-12-16 00:00:00 | ROTTERDAM HEAT      | 3101 THOMPSON ST.        | SCHENECTADY      | NY      |      12306 |          |          |          |          |          |          |       -1 |          |          |       nan |           |           |           |           |           |          0 |
|  4 |           725 | 2024-12-18 00:00:00 | SORRENTINOS DELI    | 241 GROOMS RD            | Clifton Park     | NY      |      12065 |          |          |          |          |          |          |      nan |          |          |        -1 |           |           |           |           |           |         -1 |
|  5 |           650 | 2024-12-18 00:00:00 | ADIRONDACK POOL     | 5 BOULEVARD              | QUEENSBURY       | NY      |      12804 |          |          |          |          |          |          |      nan |          |          |        -1 |           |           |           |           |           |         -1 |
|  6 |           790 | 2024-12-18 00:00:00 | GRAPE VINE LIQUOR   | 3039 RT.50 WILTON SQUARE | Saratoga Springs | NY      |      12866 |          |          |          |          |          |          |      nan |          |          |        -1 |           |           |           |           |           |         -1 |
|  7 |           725 | 2024-12-18 00:00:00 | CHAMPS CHIMNEY      | 845 RT.9                 | QUEENSBURY       | NY      |      12804 |          |          |          |          |          |          |      nan |          |          |        -1 |           |           |           |           |           |         -1 |
|  8 |           790 | 2024-12-18 00:00:00 | WEST AVE PIZZA      | 99 WEST AVE              | Saratoga Springs | NY      |      12866 |          |          |          |          |          |          |      nan |          |          |        -1 |           |           |           |           |           |         -1 |
|  9 |           765 | 2024-12-16 00:00:00 | ALL PHASE MASONRY   | P.O. BOX 2               | FEURA BUSH       | NY      |      12067 |          |          |          |          |          |          |       -1 |          |          |       nan |           |           |           |           |           |          0 |

## tblOverdueReports2030_9/29/97

Row count: 16

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Selected       | str      |    255 | Yes        |
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |

### Sample Data

|    |   Selected |   Balance due | zoning date         | Company Name                 | Street Address        | City           | State   |   Zip code | Zone 1   | Zone 2   | Zone 3   | Zone 4   |   Zone 5 | Zone 6   | Zone 7   | Zone 8   | Zone 9   | Zone 10   | Zone 11   | Zone 12   |
|---:|-----------:|--------------:|:--------------------|:-----------------------------|:----------------------|:---------------|:--------|-----------:|:---------|:---------|:---------|:---------|---------:|:---------|:---------|:---------|:---------|:----------|:----------|:----------|
|  0 |         -1 |           182 | 1997-09-01 00:00:00 | ADVANCED CAR WASH            | 48 VOORHEESVILLE AVE. | VOORHEESVILLE  | NY      |      12186 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  1 |         -1 |           182 | 1997-09-01 00:00:00 | ENGRAVE A GIFT               | 2080 WESTERN AVE      | GUilderland    | NY      |      12084 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  2 |         -1 |           184 | 1997-09-01 00:00:00 | JAYCEES PIZZA DEPOT          | 8 SOUTH MAIN ST.      | VOORHEESVILLE  | NY      |      12186 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  3 |         -1 |           343 | 1997-09-01 00:00:00 | SUBS N SIDES                 | 5 NEW KARNER RD       | GUilderland    | NY      |      12084 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  4 |         -1 |           550 | 1997-09-01 00:00:00 | TOUCH OF COUNTRY             | 20 MALL               | GUILDERLAND    | NY      |      12084 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  5 |         -1 |           550 | 1997-09-01 00:00:00 | MOVIES  & MORE SUPERSTORE    | 3770 CARMEN RD.       | SChenectady    | NY      |      12303 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  6 |         -1 |           182 | 1997-09-01 00:00:00 | DE LA CRUZ PHOTO             | 598 COLUMBIA TURNPIKE | East Greenbush | NY      |      12061 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  7 |         -1 |           650 | 1997-09-01 00:00:00 | TIME WARNER CABLE & SECURITY | 59 LEVERSEE RD.       | TROY           | NY      |      12182 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  8 |         -1 |           550 | 1997-09-01 00:00:00 | MAID TO ORDER                | 233 VLEY RD           | SCOtia         | NY      |      12302 |          |          |          |          |       -1 |          |          |          |          |           |           |           |
|  9 |         -1 |           550 | 1997-09-01 00:00:00 | BATH FITTER                  | P.O.BOX 13446         | Albany         | NY      |  122123446 |          |          |          |          |       -1 |          |          |          |          |           |           |           |

## tblOverdueReports2030used

Row count: 19

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Selected       | str      |    255 | Yes        |
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |

### Sample Data

|    |   Selected |   Balance due | zoning date         | Company Name                 | Street Address         | City        | State   |   Zip code | Zone 1   | Zone 2   |   Zone 3 | Zone 4   | Zone 5   | Zone 6   | Zone 7   | Zone 8   | Zone 9   | Zone 10   | Zone 11   | Zone 12   |
|---:|-----------:|--------------:|:--------------------|:-----------------------------|:-----------------------|:------------|:--------|-----------:|:---------|:---------|---------:|:---------|:---------|:---------|:---------|:---------|:---------|:----------|:----------|:----------|
|  0 |         -1 |           171 | 1996-08-02 00:00:00 | BROOKLYNS AMERICAN GRILL     | 93W CAMPBELL RD        | SChenectady | NY      |      12306 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  1 |         -1 |           100 | 1996-08-02 00:00:00 | CUTTING EDGE                 | 1879 ALTAMONT AVE.     | SCHENECTADY | NY      |      12303 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  2 |         -1 |           650 | 1996-08-02 00:00:00 | BONFARE                      | 2009 BROADWAY          | SChenectady | NY      |      12306 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  3 |         -1 |           550 | 1996-08-02 00:00:00 | MR. SUBB                     | 621 COLUMBIA TPK. EXT. | COHOES      | NY      |      12047 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  4 |         -1 |           515 | 1996-08-02 00:00:00 | PETTA S RESTAURANT           | 134 DUANE AVE.         | SCHenectady | NY      |      12307 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  5 |         -1 |           550 | 1996-08-02 00:00:00 | BAGEL OR                     | 1064 CURRY RD.         | SChenectady | NY      |      12306 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  6 |         -1 |           525 | 1996-08-02 00:00:00 | SWEET SUE S                  | 2013 STATE ST.         | SChenectady | NY      |      12304 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  7 |         -1 |           550 | 1996-08-02 00:00:00 | ROTTERDAM LANDSCAPING        | 377 BIRCHWOOD DR.      | DUANESBURG  | NY      |      12056 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  8 |         -1 |           550 | 1996-08-02 00:00:00 | MR.K S CARPET                | 3095 SPAWN RD.         | SChenectady | NY      |      12303 |          |          |       -1 |          |          |          |          |          |          |           |           |           |
|  9 |         -1 |           650 | 1996-08-02 00:00:00 | TIME WARNER CABLE & SECURITY | 59 LEVERSEE RD.        | TROY        | NY      |      12182 |          |          |       -1 |          |          |          |          |          |          |           |           |           |

## tblOverdueReports3145

Row count: 24

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |
| Zone 13        | int      |     10 | Yes        |
| Zone 14        | int      |     10 | Yes        |
| Zone 15        | int      |     10 | Yes        |
| Selected       | str      |    255 | Yes        |

### Sample Data

|    |   Balance due | zoning date         | Company Name                | Street Address       | City           | State   |   Zip code | Zone 1   | Zone 2   | Zone 3   | Zone 4   | Zone 5   | Zone 6   |   Zone 7 | Zone 8   | Zone 9   | Zone 10   | Zone 11   | Zone 12   |   Zone 13 | Zone 14   | Zone 15   |   Selected |
|---:|--------------:|:--------------------|:----------------------------|:---------------------|:---------------|:--------|-----------:|:---------|:---------|:---------|:---------|:---------|:---------|---------:|:---------|:---------|:----------|:----------|:----------|----------:|:----------|:----------|-----------:|
|  0 |           725 | 2024-09-03 00:00:00 | MAYFAIR JEWELERS            | 7 GLENRIDGE RD       | Scotia         | NY      |      12302 |          |          |          |          |          |          |       -1 |          |          |           |           |           |       nan |           |           |         -1 |
|  1 |           695 | 2024-09-03 00:00:00 | ROTTERDAM HEAT              | 3101 THOMPSON ST.    | SCHENECTADY    | NY      |      12306 |          |          |          |          |          |          |       -1 |          |          |           |           |           |       nan |           |           |         -1 |
|  2 |           725 | 2024-08-26 00:00:00 | SORRENTINOS DELI            | 241 GROOMS RD        | Clifton Park   | NY      |      12065 |          |          |          |          |          |          |      nan |          |          |           |           |           |        -1 |           |           |         -1 |
|  3 |           725 | 2024-09-03 00:00:00 | MIDAS AUTO SERVICE          | 1101 MONROE ST.      | TOLEDO         | OH      |      43604 |          |          |          |          |          |          |       -1 |          |          |           |           |           |       nan |           |           |         -1 |
|  4 |           595 | 2024-08-26 00:00:00 | ADIRONDACK QUILTS           | 22 FIFTH ST          | S. GLENS FALLS | NY      |      12803 |          |          |          |          |          |          |      nan |          |          |           |           |           |        -1 |           |           |         -1 |
|  5 |           695 | 2024-09-03 00:00:00 | RAINBOW NAIL SPA            | 1170 CENTRAL AVE     | Albany         | NY      |      12205 |          |          |          |          |          |          |       -1 |          |          |           |           |           |       nan |           |           |         -1 |
|  6 |           790 | 2024-08-26 00:00:00 | HOGWASH CLEANING SOLUTIONS  | P.O.BOX 2768         | GLENS FALLS    | NY      |      12801 |          |          |          |          |          |          |      nan |          |          |           |           |           |        -1 |           |           |         -1 |
|  7 |           750 | 2024-09-03 00:00:00 | RICHARDS PAVING             | 860 HUDSON RIVER RD. | MECHANICVILLE  | NY      |      12118 |          |          |          |          |          |          |       -1 |          |          |           |           |           |       nan |           |           |         -1 |
|  8 |           790 | 2024-08-26 00:00:00 | PURE PERFECTION LANDSCAPING | P.O.BOX 3510         | GLENS FALLS    | NY      |      12801 |          |          |          |          |          |          |      nan |          |          |           |           |           |        -1 |           |           |         -1 |
|  9 |           725 | 2024-08-26 00:00:00 | CPE TREE SERVICE            | 67 DUNSEACH RD       | Clifton Park   | NY      |      12065 |          |          |          |          |          |          |      nan |          |          |           |           |           |        -1 |           |           |         -1 |

## tblOverdueReports3145used

Row count: 17

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Selected       | str      |    255 | Yes        |
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |

### Sample Data

|    |   Selected |   Balance due | zoning date         | Company Name                 | Street Address    | City         | State   |   Zip code | Zone 1   | Zone 2   |   Zone 3 | Zone 4   | Zone 5   | Zone 6   | Zone 7   |   Zone 8 | Zone 9   | Zone 10   | Zone 11   | Zone 12   |
|---:|-----------:|--------------:|:--------------------|:-----------------------------|:------------------|:-------------|:--------|-----------:|:---------|:---------|---------:|:---------|:---------|:---------|:---------|---------:|:---------|:----------|:----------|:----------|
|  0 |         -1 |           550 | 1996-08-01 00:00:00 | MIKE S VIDEO                 | MARIAVILLE RD.    | SChenectady  | NY      |      12306 |          |          |       -1 |          |          |          |          |      nan |          |           |           |           |
|  1 |         -1 |           171 | 1996-08-01 00:00:00 | CHOCOLATE EXPRESS            | 1593 CENTRAL AVE. | Albany       | NY      |      12205 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |
|  2 |         -1 |           625 | 1996-08-01 00:00:00 | RAINDANCER CAR WASH          | P.O.BOX 11178     | LOUDONVILLE  | NY      |      12211 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |
|  3 |         -1 |           550 | 1996-08-01 00:00:00 | PIZZA MARE                   | 1839 CENTRAL AVE  | Albany       | NY      |      12205 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |
|  4 |         -1 |           550 | 1996-08-01 00:00:00 | MANHATTAN BAGEL II           | 1814 CENTRAL AVE  | Albany       | NY      |      12205 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |
|  5 |         -1 |           550 | 1996-08-01 00:00:00 | TIRE & BRAKE DIST. 3         | 2040 CENTRAL AVE. | Albany       | NY      |      12205 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |
|  6 |         -1 |           550 | 1996-08-01 00:00:00 | ASHLINE MOVING               | P.O.BOX 453       | Watervliet   | NY      |      12189 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |
|  7 |         -1 |           490 | 1996-08-01 00:00:00 | SIDING SOLUTIONS             | P.O.BOX 2064      | Clifton Park | NY      |      12065 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |
|  8 |         -1 |           650 | 1996-08-01 00:00:00 | TIME WARNER CABLE & SECURITY | 59 LEVERSEE RD.   | TROY         | NY      |      12182 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |
|  9 |         -1 |           367 | 1996-08-01 00:00:00 | VICTORY LANE SPEEDWAY        | 1921 DOVER LANE   | CASTLETON    | NY      |      12033 |          |          |      nan |          |          |          |          |       -1 |          |           |           |           |

## tblOverdueReports4689

Row count: 12

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |
| Zone 13        | int      |     10 | Yes        |
| Zone 14        | int      |     10 | Yes        |
| Zone 15        | int      |     10 | Yes        |
| Selected       | str      |    255 | Yes        |

### Sample Data

|    |   Balance due | zoning date         | Company Name       | Street Address        | City        | State   |   Zip code | Zone 1   |   Zone 2 | Zone 3   | Zone 4   | Zone 5   | Zone 6   | Zone 7   | Zone 8   | Zone 9   | Zone 10   | Zone 11   | Zone 12   | Zone 13   | Zone 14   | Zone 15   |   Selected |
|---:|--------------:|:--------------------|:-------------------|:----------------------|:------------|:--------|-----------:|:---------|---------:|:---------|:---------|:---------|:---------|:---------|:---------|:---------|:----------|:----------|:----------|:----------|:----------|:----------|-----------:|
|  0 |           595 | 2017-11-13 00:00:00 | GOLDSTOCKS SPORTS  | 98 FREEMANS BRIDGE RD | SCOtia      | NY      |      12302 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |         -1 |
|  1 |           695 | 2017-11-13 00:00:00 | SONDRAS JEWELRY    | 1624 UNION ST         | SCHENECTADY | NY      |      12309 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |          0 |
|  2 |           695 | 2017-11-13 00:00:00 | MIDAS AUTO SERVICE | 1101 MONROE ST.       | TOLEDO      | OH      |      43604 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |         -1 |
|  3 |           660 | 2017-11-13 00:00:00 | BOULEVARD BOWL     | 1315 ERIE BLVD        | Schenectady | NY      |      12305 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |         -1 |
|  4 |           660 | 2017-11-13 00:00:00 | TURF TAVERN        | 40 MOHAWK AVE         | Scotia      | NY      |      12302 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |          0 |
|  5 |           275 | 2017-11-13 00:00:00 | UNION CAFÉ         | 1725 UNION ST         | NISKAYUNA   | NY      |      12309 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |          0 |
|  6 |           275 | 2017-11-13 00:00:00 | ONE HUGE SAVINGS   | 1716 UNION ST         | Schenectady | NY      |      12308 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |          0 |
|  7 |           670 | 2017-11-13 00:00:00 | NOTT ST OFFICE     | 2215 NOTT ST          | Schenectady | NY      |      12309 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |          0 |
|  8 |           655 | 2017-11-13 00:00:00 | TESOROS CAFÉ       | 1712 UNION ST         | Schenectady | NY      |      12309 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |          0 |
|  9 |           645 | 2017-11-13 00:00:00 | PREDELS RANCH      | 59 GARNSEY RD         | REXFORD     | NY      |      12148 |          |       -1 |          |          |          |          |          |          |          |           |           |           |           |           |           |          0 |

## tblOverdueReports4689used

Row count: 35

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Selected       | str      |    255 | Yes        |
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |

### Sample Data

|    |   Selected |   Balance due | zoning date         | Company Name               | Street Address     | City         | State   |   Zip code | Zone 1   |   Zone 2 | Zone 3   | Zone 4   | Zone 5   |   Zone 6 |   Zone 7 | Zone 8   | Zone 9   | Zone 10   | Zone 11   | Zone 12   |
|---:|-----------:|--------------:|:--------------------|:---------------------------|:-------------------|:-------------|:--------|-----------:|:---------|---------:|:---------|:---------|:---------|---------:|---------:|:---------|:---------|:----------|:----------|:----------|
|  0 |         -1 |         443   | 1996-07-01 00:00:00 | SALISBURY SEALCOATING      | 570 ELM AVE        | SELKIRK      | NY      |      12158 |          |      nan |          |          |          |      nan |       -1 |          |          |           |           |           |
|  1 |         -1 |         171   | 1996-06-07 00:00:00 | MARMARINOS REST.           | 2025 STATE ST.     | SChenectady  | NY      |      12304 |          |       -1 |          |          |          |      nan |      nan |          |          |           |           |           |
|  2 |         -1 |         257.5 | 1996-07-01 00:00:00 | PIZZA BARON                | 315 CENTRAL AVE    | ALBany       | NY      |      12206 |          |      nan |          |          |          |      nan |       -1 |          |          |           |           |           |
|  3 |         -1 |         343   | 1996-06-28 00:00:00 | YOU MISSED A SPOT          | 55 W.SAND LAKE RD. | WYNANTSKILL  | NY      |      12198 |          |      nan |          |          |          |       -1 |      nan |          |          |           |           |           |
|  4 |         -1 |         515   | 1996-06-07 00:00:00 | BROWNS POOL SERVICE        | 633 DUANESBURG RD. | SChenectady  | NY      |      12306 |          |       -1 |          |          |          |      nan |      nan |          |          |           |           |           |
|  5 |         -1 |         515   | 1996-06-07 00:00:00 | FOUNTAINS HOME IMPROVEMENT | 1205 UNION ST      | SChenectady  | NY      |      12308 |          |       -1 |          |          |          |      nan |      nan |          |          |           |           |           |
|  6 |         -1 |         515   | 1996-07-01 00:00:00 | TIRE & BRAKE DIST. 3       | 2040 CENTRAL AVE.  | Albany       | NY      |      12205 |          |      nan |          |          |          |      nan |       -1 |          |          |           |           |           |
|  7 |         -1 |         385   | 1996-07-01 00:00:00 | ASHLINE MOVING             | P.O.BOX 453        | Watervliet   | NY      |      12189 |          |      nan |          |          |          |      nan |       -1 |          |          |           |           |           |
|  8 |         -1 |          30   | 1996-07-01 00:00:00 | SIDING SOLUTIONS           | P.O.BOX 2064       | Clifton Park | NY      |      12065 |          |      nan |          |          |          |      nan |       -1 |          |          |           |           |           |
|  9 |         -1 |         515   | 1996-07-01 00:00:00 | WINDFLOWER FLORIST         | DELAWARE PLAZA     | Delmar       | NY      |      12054 |          |      nan |          |          |          |      nan |       -1 |          |          |           |           |           |

## tblOverdueReports90

Row count: 44

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |
| Zone 13        | int      |     10 | Yes        |
| Zone 14        | int      |     10 | Yes        |
| Zone 15        | int      |     10 | Yes        |
| Selected       | str      |    255 | Yes        |
| Serious        | str      |    255 | Yes        |

### Sample Data

|    |   Balance due | zoning date         | Company Name          | Street Address    | City         | State   |   Zip code | Zone 1   |   Zone 2 | Zone 3   | Zone 4   | Zone 5   |   Zone 6 |   Zone 7 | Zone 8   | Zone 9   |   Zone 10 | Zone 11   |   Zone 12 | Zone 13   | Zone 14   | Zone 15   |   Selected | Serious   |
|---:|--------------:|:--------------------|:----------------------|:------------------|:-------------|:--------|-----------:|:---------|---------:|:---------|:---------|:---------|---------:|---------:|:---------|:---------|----------:|:----------|----------:|:----------|:----------|:----------|-----------:|:----------|
|  0 |           695 | 2023-08-28 00:00:00 | ROTTERDAM HEAT        | 3101 THOMPSON ST. | SCHENECTADY  | NY      |      12306 |          |      nan |          |          |          |      nan |       -1 |          |          |       nan |           |       nan |           |           |           |         -1 |           |
|  1 |           750 | 2023-09-12 00:00:00 | SAVEMORE BEVERAGE     | 1512 RT.9         | Clifton Park | NY      |      12065 |          |      nan |          |          |          |      nan |      nan |          |          |       nan |           |        -1 |           |           |           |         -1 |           |
|  2 |           725 | 2023-09-20 00:00:00 | SORRENTINOS DELI      | 241 GROOMS RD     | Clifton Park | NY      |      12065 |          |      nan |          |          |          |      nan |      nan |          |          |        -1 |           |       nan |           |           |           |         -1 |           |
|  3 |           750 | 2023-04-04 00:00:00 | STEINERS SPORTS       | 329 GLENMONT RD   | Glenmont     | NY      |      12077 |          |      nan |          |          |          |      nan |       -1 |          |          |       nan |           |       nan |           |           |           |         -1 |           |
|  4 |           450 | 2022-02-07 00:00:00 | COMPUTER MECHANIC     | 2330 WATT ST      | Schenectady  | NY      |      12304 |          |       -1 |          |          |          |      nan |      nan |          |          |       nan |           |       nan |           |           |           |         -1 |           |
|  5 |           750 | 2022-04-13 00:00:00 | COMPUTER MECHANIC     | 2330 WATT ST      | Schenectady  | NY      |      12304 |          |      nan |          |          |          |       -1 |      nan |          |          |       nan |           |       nan |           |           |           |         -1 |           |
|  6 |           750 | 2022-08-15 00:00:00 | COMPUTER MECHANIC     | 2330 WATT ST      | Schenectady  | NY      |      12304 |          |       -1 |          |          |          |      nan |      nan |          |          |       nan |           |       nan |           |           |           |         -1 |           |
|  7 |           750 | 2022-11-16 00:00:00 | COMPUTER MECHANIC     | 2330 WATT ST      | Schenectady  | NY      |      12304 |          |       -1 |          |          |          |      nan |      nan |          |          |       nan |           |       nan |           |           |           |         -1 |           |
|  8 |           750 | 2023-02-20 00:00:00 | COMPUTER MECHANIC     | 2330 WATT ST      | Schenectady  | NY      |      12304 |          |       -1 |          |          |          |      nan |      nan |          |          |       nan |           |       nan |           |           |           |         -1 |           |
|  9 |           450 | 2023-08-28 00:00:00 | ANGELAS PIZZA & PASTA | 329 GLENMONT RD   | Glenmont     | NY      |      12077 |          |      nan |          |          |          |      nan |       -1 |          |          |       nan |           |       nan |           |           |           |         -1 |           |

## tblOverdueReports90SeriousReports

Row count: 0

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Selected       | str      |    255 | Yes        |
| Serious        | str      |    255 | Yes        |
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |

## tblOverdueReports90used

Row count: 31

### Columns

| Name           | Type     |   Size | Nullable   |
|:---------------|:---------|-------:|:-----------|
| Selected       | str      |    255 | Yes        |
| Serious        | str      |    255 | Yes        |
| Balance due    | float    |     53 | Yes        |
| zoning date    | datetime |     19 | Yes        |
| Company Name   | str      |     50 | Yes        |
| Street Address | str      |     50 | Yes        |
| City           | str      |     50 | Yes        |
| State          | str      |      2 | Yes        |
| Zip code       | str      |     50 | Yes        |
| Zone 1         | int      |     10 | Yes        |
| Zone 2         | int      |     10 | Yes        |
| Zone 3         | int      |     10 | Yes        |
| Zone 4         | int      |     10 | Yes        |
| Zone 5         | int      |     10 | Yes        |
| Zone 6         | int      |     10 | Yes        |
| Zone 7         | int      |     10 | Yes        |
| Zone 8         | int      |     10 | Yes        |
| Zone 9         | int      |     10 | Yes        |
| Zone 10        | int      |     10 | Yes        |
| Zone 11        | int      |     10 | Yes        |
| Zone 12        | int      |     10 | Yes        |

### Sample Data

|    |   Selected | Serious   |   Balance due | zoning date         | Company Name              | Street Address         | City         | State   |   Zip code | Zone 1   |   Zone 2 | Zone 3   |   Zone 4 |   Zone 5 |   Zone 6 | Zone 7   |   Zone 8 |   Zone 9 | Zone 10   | Zone 11   | Zone 12   |
|---:|-----------:|:----------|--------------:|:--------------------|:--------------------------|:-----------------------|:-------------|:--------|-----------:|:---------|---------:|:---------|---------:|---------:|---------:|:---------|---------:|---------:|:----------|:----------|:----------|
|  0 |         -1 |           |           195 | 1995-06-01 00:00:00 | WOLF RD. CLEANERS         | 199 WOLF RD.           | Albany       | NY      |      12205 |          |      nan |          |      nan |      nan |       -1 |          |      nan |      nan |           |           |           |
|  1 |         -1 |           |           565 | 1995-06-01 00:00:00 | CRYSTAL COACH LIMO        | 443 CHISWELL AVE.      | SChenectady  | NY      |      12304 |          |       -1 |          |      nan |      nan |       -1 |          |      nan |       -1 |           |           |           |
|  2 |         -1 |           |          1060 | 1995-09-01 00:00:00 | L ECOLE ENCORE            | FULLER RD.             | Albany       | NY      |      12203 |          |      nan |          |      nan |       -1 |      nan |          |      nan |       -1 |           |           |           |
|  3 |         -1 |           |           165 | 1995-10-01 00:00:00 | SUPERIOR TAXI             | 1056 ALTAMONT AVE      | SChenectady  | NY      |      12303 |          |       -1 |          |      nan |      nan |      nan |          |      nan |      nan |           |           |           |
|  4 |         -1 |           |           495 | 1995-12-08 00:00:00 | WOLF RD. CLEANERS         | 199 WOLF RD.           | Albany       | NY      |      12205 |          |      nan |          |      nan |      nan |      nan |          |       -1 |      nan |           |           |           |
|  5 |         -1 |           |           300 | 1995-12-08 00:00:00 | TANMASTERS                | WOLF RD. SHOPPERS PARK | Albany       | NY      |      12205 |          |      nan |          |      nan |      nan |      nan |          |       -1 |      nan |           |           |           |
|  6 |         -1 |           |           330 | 1996-01-04 00:00:00 | PIZZA BARON 2             | 1602 RT.9              | Clifton Park | NY      |      12065 |          |      nan |          |       -1 |      nan |      nan |          |      nan |      nan |           |           |           |
|  7 |         -1 |           |           530 | 1996-01-05 00:00:00 | L ECOLE ENCORE            | FULLER RD.             | Albany       | NY      |      12203 |          |      nan |          |      nan |       -1 |      nan |          |      nan |      nan |           |           |           |
|  8 |         -1 |           |           165 | 1996-02-16 00:00:00 | THOMPSON CLEANING SERVICE | 1074 PARKWOOD BLVD.    | SChenectady  | NY      |      12308 |          |       -1 |          |      nan |      nan |      nan |          |      nan |      nan |           |           |           |
|  9 |         -1 |           |           515 | 1996-02-16 00:00:00 | SUPERIOR TAXI             | 1056 ALTAMONT AVE      | SChenectady  | NY      |      12303 |          |       -1 |          |      nan |      nan |      nan |          |      nan |      nan |           |           |           |

## temp table

Row count: 2

### Columns

| Name   | Type   |   Size | Nullable   |
|:-------|:-------|-------:|:-----------|
| ID     | int    |     10 | No         |
| Month  | str    |     50 | Yes        |
| Zone   | str    |     50 | Yes        |
| Year   | str    |     50 | Yes        |

### Indexes

- PrimaryKey: Unique (ID)

### Sample Data

|    |   ID |   Month |   Zone |   Year |
|---:|-----:|--------:|-------:|-------:|
|  0 |    5 |      12 |     10 |     31 |
|  1 |    6 |      07 |      3 |     18 |

## tempdate

Row count: 1

### Columns

| Name     | Type     |   Size | Nullable   |
|:---------|:---------|-------:|:-----------|
| ID       | int      |     10 | No         |
| tempdate | datetime |     19 | Yes        |

### Indexes

- PrimaryKey: Unique (ID)

### Sample Data

|    |   ID | tempdate            |
|---:|-----:|:--------------------|
|  0 |    2 | 1995-11-01 00:00:00 |

## zonecost

Row count: 13

### Columns

| Name     | Type   |   Size | Nullable   |
|:---------|:-------|-------:|:-----------|
| zonecost | int    |     10 | Yes        |

### Indexes

- PrimaryKey: Unique (zonecost)

### Sample Data

|    |   zonecost |
|---:|-----------:|
|  0 |          0 |
|  1 |        660 |
|  2 |        680 |
|  3 |        685 |
|  4 |        695 |
|  5 |        725 |
|  6 |        755 |
|  7 |        775 |
|  8 |        780 |
|  9 |        785 |

## zones

Row count: 17

### Columns

| Name   | Type   |   Size | Nullable   |
|:-------|:-------|-------:|:-----------|
| zone   | str    |     50 | Yes        |
| order  | int    |      5 | Yes        |

### Indexes

- PrimaryKey: Unique (zone)

### Sample Data

|    |   zone |   order |
|---:|-------:|--------:|
|  0 |      1 |       1 |
|  1 |     10 |      10 |
|  2 |     11 |      11 |
|  3 |     12 |      12 |
|  4 |     13 |      13 |
|  5 |     14 |      14 |
|  6 |     15 |      15 |
|  7 |     16 |      16 |
|  8 |      2 |       2 |
|  9 |      3 |       3 |

