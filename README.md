# @toommyliu/realmeye-scraper

Scrape RealmEye player profiles and guilds for data

# Example

```ts
import { scrapeGuild, scrapePlayer, scrapeDungeons } from '@toommyliu/realmeye-scraper';

// Get guild
await scrapeGuild('Exquisite'); // Promise<RealmeyeGuild>

// Get player
await scrapePlayer('Alpine'); // Promise<RealmeyePlayer>

// Get dungeons
await scrapeDungeons(); // Promise<Set<String>>
```

# Credits
Scrape code adapted from [IrisBot](https://github.com/flanigana/IrisBot/tree/ts-rework) ([Alec Flanigan](https://github.com/flanigana)), adapted for personal use. 
Additions include typings from cheerio and modularization of the functions.

# License
[License](https://github.com/toommyliu/realmeye-scraper/blob/main/LICENSE)