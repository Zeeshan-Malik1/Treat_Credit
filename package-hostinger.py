from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent
files = ['index.html', 'menu.html', 'order.html', 'contact.html', 'styles.css', 'app.js', 'menu-data.js']
files += ['images/' + name for name in ['logo.png', 'maintxt.png', 'bestproduct.png', 'menubackground.png', 'car.gif', 'pay.gif', 'eat.gif']]
with ZipFile(root / 'treat-credit-hostinger.zip', 'w', ZIP_DEFLATED) as archive:
    for name in files:
        archive.write(root / name, name)
with ZipFile(root / 'treat-credit-hostinger.zip') as archive:
    assert archive.testzip() is None
    assert 'index.html' in archive.namelist()
print('Created treat-credit-hostinger.zip with', len(files), 'website files.')
