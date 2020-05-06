## Instafluff ##
> *Like these projects? The best way to support my open-source projects is by becoming a Comfy Sponsor on GitHub!*

> https://github.com/sponsors/instafluff

> *Come and hang out with us at the Comfiest Corner on Twitch!*

> https://twitch.tv/instafluff

# StrangeWeather
Using [Microsoft Azure Anomaly Detection API](https://aka.ms/instafluff-social) to detect strange weather patterns!

We connected the daily temperature average/minimum/maximum and precipitation data of various cities around the world using [NOAA CDO Web Services API](https://www.ncdc.noaa.gov/cdo-web/) to the Azure Anomaly Detection API in order to find abnormal changes in weather patterns during stream at the [Comfy Corner](https://twitch.tv/instafluff) sponsored by [Microsoft Azure](https://aka.ms/instafluff-social) on May 1, 2020!

We discovered interesting data points such as the super cold Valentine's Day 2020 across various cities in the United States, and could figure out rainy days of various cities using the precipitation data as well.

# Instructions

1. Make sure NodeJS is installed. You can download it at [www.nodejs.org](https://www.nodejs.org)

2. Download or Clone this repository to a folder. In a terminal window, you can type `git clone https://github.com/instafluff/StrangeWeather.git`

3. Install dependencies: `npm install`

4. Create a **.env** file in the project directory with your private API keys for the NOAA API and for Azure Anomaly Detection that looks like this:
```JavaScript
NOAA_KEY=lkjeriu1jkhsdf1312454123
AZURE_KEY=c487xkj3jbnljk1lkj4kj5kjh2
```

NOAA API - Available Free at [https://www.ncdc.noaa.gov/cdo-web/token](https://www.ncdc.noaa.gov/cdo-web/token)
Azure Anomaly Detection API - Free 20,000 monthly requests at [https://azure.microsoft.com/en-us/services/cognitive-services/anomaly-detector/](https://azure.microsoft.com/en-us/services/cognitive-services/anomaly-detector/)

5. Run the project with `node index.js` and then open your local server URLs in a web browser such as:

- 90 Day Temp. Min for Seattle: [http://localhost:5120/noaa/tmin?city=seattle](http://localhost:5120/noaa/tmin?city=seattle)
- 90 Day Temp. Avg for NYC: [http://localhost:5120/noaa/tavg?city=new york](http://localhost:5120/noaa/tavg?city=new york)
- 90 Day Temp. Max for Sydney: [http://localhost:5120/noaa/tmax?city=sydney](http://localhost:5120/noaa/tmax?city=sydney)
- 90 Day Precip. for Las Vegas: [http://localhost:5120/noaa/rain?city=las vegas](http://localhost:5120/noaa/rain?city=las vegas)

Thank you to everyone who participated in the abnormality detection of weather around the world using Microsoft Azure Anomaly Detection API during the Instafluff Azure-sponsored stream on May 1, 2020!

**DutchGamer46, Gilokk0, That_MS_Gamer, Instafriend, wabes1, LinusvDev, Instafluff, simrose4u, Shaezonai, aries4174599, chazdawg888, Amarogine, PlatYellow, Thrennenne, BungalowGlow, FBoucheros, arkade0, Seralius, EndlessMoonfall, shadesofpixie, holloway87, indrac_the_sucnak, ShinSharkai, SurgicalTaste, violettepanda, lobtrok, IbolyaColorHead, nopogo_tv, A_Ninja_For_Jesus_Bruh, Talk2meGooseman, squiid____, ImRichBroke, MissNightcrawler, InSanityParty, judybelle1, OnePocketPimp, PomoTheDog, LilyHazel, pookiepew, Dasgust_, JeanValjean80, kinbiko, DoctorArgus, Dav1dsnyder404, zach_a_king, aRandomTim, plop974, aronhoyer, shaggieh, mynameisinfi, StephenYeet, therealpygon, Alca, davidkelid, MajesticEye, CGRDMZ, codingpasta, AndrewLaneX, colios16, jFeliWeb, BobsParadox, TheStudentDoctor, Ukarai, docd27, rollerss, Acid_Spark, unhott, CodingGarden, informathemusic, derbucher21, iKrishCool, DrJavaSaurus, BlackKillaa, Jaany, onelineofme, shineslove, NeroTheCreator, KappaMangos, VilgotanL, Estym, SaintPlaysThings, gorkapolice, wabeswife, aprillllrose, narendev, vashcowboyspikespiegal, sadukie, Cuicui_off, Rosuav, Miss_Permafrost, PhotoSvein, DeviCat, HalfAnUnkindness, tef_bannow, Bulbalight, Kupocoffee_Art, Xillians, kuronosandwich, CalvinAAllen, iLoveHelloKitty11, SmileBringer, CrimsonKnightZero, Kaciedilla, NovaHorizon, labmonsterki, CyberViking_TV, ScrtSolstice, TrezyCodes, EleetestGames, KidLudens, overlord099, LiliaHarlow, sparky_pugwash, poppybox, Amethsikiwi, boki_dev, opti_21, juiceboxhero, DreamGardenPanda, NiteCrawla, MaxTyzzler, klforthwind, DevMerlin_, PortaalGaming, Norveejun, beingpranjal, EternalDevCoder, AshleeMBoyer, DrMikachu, Wietlol, OmTheTurtle, httpjunkie, ForeIs, MasakiOyata, malfunct, Lawralee, Nander_, BaronOfCheese, KimballDonald, roberttables, ChefBrent, vinny_code, prajalpa, bigdye1976, bluebirdhay, EmiEmil, julieee22, MaryJoStaebler**
