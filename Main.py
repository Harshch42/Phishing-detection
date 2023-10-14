from API import get_prediction

# path to trained model
model_path = r"C:\Users\ASUS\Desktop\storm_CtrlAltDefeat\Malicious_URL_Prediction.h5"
# input url
url = "https://ShoePublic.com"
lst = ["https://ShoePublic.com", "Pilosaleltd.com", "piloltd.com","AmazonStorePro.com", "Anhbhau.shop","Moziep.com", "Outdoorbest.store", "TiffanyCoShop.com" , "Omitages.com", "Morrity.com"]

websites = [
    "att-rsshelp.com",
    "paypal-opladen.be",
    "login.microsoftonline.ccisystems.us",
    "dhlinfos.link",
    "facebookztv.com",
    "irs-contact-payments.com",
    "loginnnaolcccom.weebly.com",
    "cufjaj.id",
    "adobe-pdf-sick-alley.surge.sh",
    "login-amazon-account.com",
    "apple-grx-support-online.com",
    "connect-secure-wellsfargo-com.herokuapp.com",
    "www.ebay8.bar",
    "www.swiss-post-ch.com",
    "uzzmuqwv.naveicoipa.tech",
    "instagram-com-p.proxy.webtoppings.bar",
    "joingrub-whatsapp-pistol90.duckdns.org",
    "rakutentk.com",
    "www.jreast.co.jp.card.servicelist[].bcens.net",
    "www.webcome-aexp.com",
    "aupay.kddi-fshruyrt.com",
    "office365loginonlinemicrosoft.weebly.com",
    "safemailschaseonlineserviceupgrade09.weebly.com",
    "aeon-ver1fy.shop",
    "myoptus.mobi",
    "supp0rt-coinbase.com",
    "portalbradesco-acesso.com",
    "lnternetbanklng-caixa.com",
    "www.jcb-co-jp.ascaceeccea.ioukrg.top",
    "ing-ingdirect-movil.com",
    "hsbc-bm-online.com",
    "renew-netflix.com",
    "smbc.co.jp.xazee.com",
    "nuvip2.ru",
    "www.bankmillenium-pl.com",
    "sun.pollice.xyz",
    "powiadomienieallegro.net",
    "www.inpost-polska-lox.order9512951.info",
    "correosa.online",
    "fedexpress-couriers.com",
    "linkkedin-2.weebly.com",
    "uspstrack-7518276417-addressredelivery-itemnumber.netlify.app",
    "www.googlecom.vn10000.cc",
    "baanofamericase8.hostfree.pw",
    "dpd-info.net",
    "silly-itauu.netlify.app",
    "gift-steam-discord.com",
    "swiss-comch.duckdns.org",
    "mexce.live",
    "orange-france24.yolasite.com"
]


# ShoePublic.com
# Outdoorbest.store
# TiffanyCoShop.com
# Omitages.com
# Moziep.com
# Morrity.com
# MyFaceBoxer.com
# Halaboommall.com
# returns probability of url being malicious
prediction = get_prediction(url,model_path)
res = []
total_val = 0
value_avg = 0
for i in websites:
    total_val += get_prediction(i , model_path)
    res.append([i , get_prediction(i , model_path)])
# print(prediction)
print("Result of the Model : ----------------->")
for i in res:
    print(i)

print(total_val / len(websites))
