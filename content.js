chrome.runtime.sendMessage({message: 'onOff'}, function(callBack) {
  if (callBack === 'on') {
    var loc = document.location.href;

    if (loc == 'https://centineltestadmin.cardinalcommerce.com/core/default.asp') {
      chrome.runtime.sendMessage({message: 'check count'}, function(callBack) {
        if (callBack != 0) {
          div = '<br/ ><h1 style="text-align:center">Success:</h1>' +
            '<h1 style="text-align:center">Please enter second merchant</h1><br/ >'
          document.body.innerHTML = div + document.body.innerHTML;
        }
      }
    )}

    else if (loc == "https://centineltestadmin.cardinalcommerce.com/core/MSPAdmin/viewMerchantInfo.asp") {
      const els = document.querySelectorAll("a[href='merchantPIConfigMenu.asp']");
      els[0].click();
    }

    else if (loc == "https://centineltestadmin.cardinalcommerce.com/core/MSPAdmin/merchantPIConfigMenu.asp") {
      const els = document.querySelectorAll("a[href='updateMerchantPIConfigSelect.asp']");
      els[0].click();
    }

    else if (loc == "https://centineltestadmin.cardinalcommerce.com/core/MSPAdmin/updateMerchantPIConfigSelect.asp") {
      const sel = document.getElementsByName('merchantPIConfig');
      const indx = sel[0].options.length;
    	sel[0].selectedIndex = (indx - 1);
      setTimeout(function() {
        let els = document.getElementsByName('FINISH');
        els[0].click();
      }, 500)
    }

    else if (loc == "https://centineltestadmin.cardinalcommerce.com/core/MSPAdmin/updateMerchantPIConfigPayment.asp?pi=43") {
      const tbls = document.getElementsByTagName('tbody');
      const tbl = tbls[2];
      var dict = {};
      for (i in tbl.rows) {
        var row = tbl.rows[i];
        try {
          var left = row.children[0].innerText;
        }
        catch(err){};

        try {
          //  slct = selected option from dropdown
          var slct = row.children[1].childNodes[1].childNodes[0];
          var right = slct.options[slct.selectedIndex].text;
          dict[left.replace('*', '').replace(':', '').trim()] = right
        }
        catch(err){
          try{
            var right = row.children[1].innerText;
            dict[left.replace('*', '').replace(':', '').trim()] = right
          }
          catch(err) {}
        };
      }
      delete dict[''];
      var dictStr = JSON.stringify(dict);

      msg = {
        message: 'complete',
        info: dictStr
      }
      chrome.runtime.sendMessage(msg);
    }

    else if (loc == "http://www.jsondiff.com/") {
      chrome.runtime.sendMessage({message: 'get json'}, function(callBack) {
        const left = callBack.left;
        const right = callBack.right;
        document.getElementById('textarealeft').innerHTML = left;
        document.getElementById('textarearight').innerHTML = right;
        document.getElementById('compare').click();
      })
    }
  }
});
