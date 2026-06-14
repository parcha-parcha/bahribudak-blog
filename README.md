# Revizyon 33 - Hero Logo Kart Ölçü ve Merkezleme

Bu paket ana sayfa hero alanındaki sağ logo kartını verilen ölçü mantığına göre düzenler.

Yapılanlar:

- Dış yuvarlak köşeli kart 11 cm en / 14 cm boy oranına göre ayarlandı.
- Web ortamında ölçü mobil ekrana sığacak şekilde `min(11cm, calc(100vw - 32px))` ile güvenli hale getirildi.
- Dikey logo kartın tam merkezine alındı.
- Dikey merkez çizgisi 14 cm yüksekliğin orta noktası olan 7 cm mantığına göre kuruldu.
- İç beyaz panel büyütüldü.
- Logo panelle çakışmayacak şekilde büyütüldü ve ortalandı.
- Karışan metrik/küçük yazılar kullanılmadı.

Commit mesajı:

Hero logo kart ölçüsü ve merkezleme düzeltildi
