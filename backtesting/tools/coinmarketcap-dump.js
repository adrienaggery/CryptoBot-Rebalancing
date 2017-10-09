JSON.stringify($('.table > tbody > tr').toArray().map(i => {
    const d = $(i).children();
    return {
        timestamp: Date.parse(d[0].innerText),
        open: parseFloat(d[1].innerText),
        high: parseFloat(d[2].innerText),
        low: parseFloat(d[3].innerText),
        close: parseFloat(d[4].innerText),
        volume: parseInt(d[5].innerText.replace(/,/g, '')),
        marketcap: parseInt(d[6].innerText.replace(/,/g,''))
    }
}))
