const dbPromised = idb.open("soccer-news", 2, upgradeDb => {
    var articlesObjectStore = upgradeDb.createObjectStore("team", {
        keyPath: "id"
    })
    articlesObjectStore.createIndex("name", "name", {unique: false})
})

const saveForLater = data => {
    dbPromised.then(db => {
        var tx = db.transaction("team", "readwrite")
        var store = tx.objectStore("team")
        store.add(data)
        return tx.complete
    }).then(() => {
        console.log("Artikel berhasil disimpan");
    })
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            var tx = db.transaction("team", "readonly")
            var store = tx.objectStore("team")
            return store.getAll()
        }).then(data => {
            resolve(data)
        })
    })
}

const getById = id => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            var tx = db.transaction("team", "readonly");
            var store = tx.objectStore("team");
            return store.get(parseInt(id));
        }).then(data => {
            resolve(data)
        })
    })
}

const deleteById = id => {
    dbPromised.then(db => {
        var tx = db.transaction('team', 'readwrite');
        var store = tx.objectStore('team');
        store.delete(id);
        return tx.complete;
    }).then(() => {
        console.log('Item deleted');
    });
}