const definiteArticles = {
    m: { Nominativ: 'der', Akkusativ: 'den', Dativ: 'dem', Genitiv: 'des' },
    f: { Nominativ: 'die', Akkusativ: 'die', Dativ: 'der', Genitiv: 'der' },
    n: { Nominativ: 'das', Akkusativ: 'das', Dativ: 'dem', Genitiv: 'des' },
    plural: { Nominativ: 'die', Akkusativ: 'die', Dativ: 'den', Genitiv: 'der' }
  };
  
  const indefiniteArticles = {
    m: { Nominativ: 'ein', Akkusativ: 'einen', Dativ: 'einem', Genitiv: 'eines' },
    f: { Nominativ: 'eine', Akkusativ: 'eine', Dativ: 'einer', Genitiv: 'einer' },
    n: { Nominativ: 'ein', Akkusativ: 'ein', Dativ: 'einem', Genitiv: 'eines' },
    plural: { Nominativ: '', Akkusativ: '', Dativ: '', Genitiv: '' }
  };
  
  const endings = {
    'слабое скл.': {
      Nominativ: { m: 'e', f: 'e', n: 'e', plural: 'en' },
      Akkusativ: { m: 'en', f: 'e', n: 'e', plural: 'en' },
      Dativ: { m: 'en', f: 'en', n: 'en', plural: 'en' },
      Genitiv: { m: 'en', f: 'en', n: 'en', plural: 'en' }
    },
    'смешанное скл.': {
      Nominativ: { m: 'er', f: 'e', n: 'es', plural: 'en' },
      Akkusativ: { m: 'en', f: 'e', n: 'es', plural: 'en' },
      Dativ: { m: 'en', f: 'en', n: 'en', plural: 'en' },
      Genitiv: { m: 'en', f: 'en', n: 'en', plural: 'en' }
    },
    'сильное скл.': {
      Nominativ: { m: 'er', f: 'e', n: 'es', plural: 'e' },
      Akkusativ: { m: 'en', f: 'e', n: 'es', plural: 'e' },
      Dativ: { m: 'em', f: 'er', n: 'em', plural: 'en' },
      Genitiv: { m: 'en', f: 'er', n: 'en', plural: 'er' }
    }
  };
  
  export { definiteArticles, indefiniteArticles, endings };