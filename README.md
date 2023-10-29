# BelotBroqch
Broi tochkite i sledi koi karti sa minali

![image](https://github.com/Byte-White/BelotBroqch/assets/51212450/c8b3d1ec-beac-4ed7-819f-6e4c33455857)

https://belotbroqch.web.app/
mega scuffed design

zapazva minalite karti v 32 bitov integer
vseki bit otgovarq na karta:

0b♣️♣️♣️♣️♣️♣️♣️♣️♦️♦️♦️♦️♦️♦️♦️♦️♥️♥️♥️♥️♥️♥️♥️♥️♠️♠️♠️♠️♠️♠️♠️♠️
| bit  | 31 | 30 | 29 | 28 | 27 | 26 | 25 | 24 |
|------|----|----|----|----|----|----|----|----|
| card |7♣️|8♣️|9♣️|10♣️|J♣️|Q♣️|K♣️|A♣️|

| bit  | 23 | 22 | 21 | 20  | 19 | 18 | 17 | 16 |
|------|----|----|----|-----|----|----|----|----|
| card | 7♦️ | 8♦️ | 9♦️ | 10♦️ | J♦️ | Q♦️ | K♦️ | A♦️ |

| bit  | 15 | 14 | 13 | 12  | 11 | 10 | 9 | 8 |
|------|----|----|----|-----|----|----|----|----|
| card | 7♥️ | 8♥️ | 9♥️ | 10♥️ | J♥️ | Q♥️ | K♥️ | A♥️ |

| bit  | 7 | 6 | 5 | 4  | 3 | 2 | 1 | 0 |
|------|----|----|----|-----|----|----|----|----|
| card | 7♠️ | 8♠️ | 9♠️ | 10♠️ | J♠️ | Q♠️ | K♠️ | A♠️ |