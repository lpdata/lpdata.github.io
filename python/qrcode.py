import qrcode

# URL do site
url = "https://lpdata.github.io/"

# Criando QR Code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

# Salvar em arquivo
img = qr.make_image(fill_color="black", back_color="white")
img.save("qrcode_site.png")
