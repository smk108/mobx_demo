import zhCn from './zh-CN';
import enUs from './en-US';

const G_INTL = {
    "ZH_CN": zhCn,
    "EN_US": enUs
};

function getLocale() {
  // zh_CN en_US
  let locale = null;
  // url
  locale = this.urlParse("locale");
  // cookie
  if (!locale)
    locale = this.getCookie("locale");
  // brower
  if (!locale)
    locale = this.browerParse();
  if (!locale)
    locale = 'zh_CN'
  locale = locale.replace(/-/g, "_").toUpperCase();
  if (locale === 'ZH')
    locale = "ZH_CN"
  else if (locale === 'EN')
    locale = "EN_US"
  else if (locale != 'ZH_CN' && locale != 'EN_US')
    locale = 'ZH_CN'
  return locale;
}

export default function intl(key, def = '') {
    if (key) {
        let locale = getLocale();
        let val = G_INTL[locale];
        let keys = key.split(".");
        keys.map(tmp => {
            if (val)
                val = val[tmp];
        });
        if (val)
            return val;
    }
    return def;
}