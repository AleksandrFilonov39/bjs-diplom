'use strict'

let logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((responce) => {
       console.log(responce.success);
        if(responce.success) {
            location.reload();
        }
    });
};


ApiConnector.current((responce) => {
    console.log('current usrer')
    console.log(responce);
    if(responce.success) {
        ProfileWidget.showProfile(responce.data);
    }
});


let ratesBoard = new RatesBoard();

let getStocks = () => {
    ApiConnector.getStocks((responce) => {
       console.log(responce);
        if(responce.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responce.data);
        }
    });
};

getStocks ();

setInterval (getStocks, 2000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    console.log(data);
    ApiConnector.addMoney(data, (responce) => {
        console.log(responce);
        if(responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(responce.success, "Операция завершена успешно");
        } else {
            moneyManager.setMessage(responce.success, responce.error);
        }
    })
};


moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (responce) => {
        console.log(responce);
        if(responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(responce.success, "Операция завершена успешно");
        } else {
            moneyManager.setMessage(responce.success, responce.error);
        }
    })
};


moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (responce) => {
        console.log(responce);
        if(responce.success) {
            ProfileWidget.showProfile(responce.data);
            moneyManager.setMessage(responce.success, "Операция завершена успешно");
        } else {
            moneyManager.setMessage(responce.success, responce.error);
        }
    })
};


let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((responce) => {
    console.log(responce);
    if(responce.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responce.data);
        moneyManager.updateUsersList(responce.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (responce) => {
        console.log(responce);
        if(responce.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager.updateUsersList(responce.data);
            favoritesWidget.setMessage(responce.success, "Операция завершена успешно");
        } else {
            favoritesWidget.setMessage(responce.success, responce.error);
        }
    });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (responce) => {
        console.log(responce);
        if(responce.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager.updateUsersList(responce.data);
            favoritesWidget.setMessage(responce.success, "Операция завершена успешно");
        } else {
            favoritesWidget.setMessage(responce.success, responce.error);
        }
    });
};