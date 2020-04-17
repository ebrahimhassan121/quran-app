import Realm from 'realm';
export const SurahSchemaName = 'surah';
export const AyahSchemaName = 'ayah';
export const SajdaSchemaName = 'sajda';
export const lastViewedSchemaName = 'last_viewed';
export const SurahSchema = {
  name: SurahSchemaName,
  properties: {
    number: 'int',
    name: 'string',
    englishName: 'string',
    englishNameTranslation: 'string',
    revelationType: 'string',
    ayahs: 'ayah[]',
  },
};

export const AyahSchema = {
  name: AyahSchemaName,
  properties: {
    number: 'int',
    text: 'string',
    numberInSurah: 'int',
    juz: 'int',
    manzil: 'int',
    page: 'int',
    ruku: 'int',
    sajda: 'sajda?',
  },
};
export const SajdaSchema = {
  name: SajdaSchemaName,
  properties: {
    id: 'int',
    recommended: 'bool',
    obligatory: 'bool',
  },
};
export const lastViewedSchema = {
  name: lastViewedSchemaName,
  properties: {
    ayah: 'int',
  },
};
const DbOptions = {
  path: 'quran.realm',
  schema: [SurahSchema, AyahSchema, SajdaSchema, lastViewedSchema],
  schemaVersion: 4,
};

export const InsertQuranData = async (list = []) => {
  const data = await fixArrayTypes(list);
  Realm.open(DbOptions)
    .then((realm) => {
      realm.write(async () => {
        if (!realm.empty) {
          return;
          let allObj = realm.objects(SurahSchema);
          await realm.delete(allObj);
        }
        await data.forEach(async (surahObj, i) => {
          try {
            await realm.create('surah', surahObj);
          } catch (error) {
            console.error(error, i, 'error  ====>', surahObj);
          }
        });
        realm.close();
      });
    })
    .catch((error) => {
      console.error('error XXXX|', error);
    });
};

const fixArrayTypes = (data) => {
  let fixed = data.map((surahObj, i) => {
    surahObj.ayahs = surahObj.ayahs.map((ayahObj) => {
      if (ayahObj.sajda === false) ayahObj.sajda = null;
      return ayahObj;
    });
    return surahObj;
  });
  return fixed;
};

export const GetSurahs = () => {
  return Realm.open(DbOptions).then((re) => {
    return re.objects(SurahSchemaName);
  });
};
export const GetSurahByAyahNumber = (number) => {
  return Realm.open(DbOptions).then((re) => {
    return re
      .objects(SurahSchemaName)
      .filtered('ANY ayahs.number = ' + number)[0];
  });
};
export const GetJuzByJuzNumber = (juzNum) => {
  return Realm.open(DbOptions).then((re) => {
    return re.objects(AyahSchemaName).filtered('juz = ' + juzNum);
  });
};
export const InsertLastViewedAyah = async (ayahNum) => {
  Realm.open(DbOptions)
    .then((realm) => {
      const ayah = realm.objects(lastViewedSchemaName);
      realm.write(async () => {
        if (ayah[0]) {
          ayah[0].ayah = ayahNum;
        } else {
          await realm.create('last_viewed', {ayah: ayahNum});
        }
      });
    })
    .catch((error) => {
      console.error('error XXXX|', error);
    });
};
export const GetlastViewedAyah = () => {
  return Realm.open(DbOptions).then((re) => {
    const All = re.objects(lastViewedSchemaName);
    const last = All[All.length - 1];
    if (last == undefined) return null;
    const surah = re
      .objects(SurahSchemaName)
      .filtered(`ANY ayahs.number = ${last.ayah}`);
    const ayah = re
      .objects(AyahSchemaName)
      .filtered('number = ' + last.ayah)[0];
    return {
      surah: surah[0],
      ayah: ayah,
      number: last.ayah,
    };
  });
};
export default new Realm(DbOptions);
