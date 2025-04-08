window.onload = () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>🏠 پیش‌بینی‌ قیمت خانه</h1>
        <p style="text-align: center;">بر اساس قیمت ۱۴۰۱</>
        <input id="area" placeholder="مساحت (متر)" type="number" />
        <input id="room" placeholder="تعداد اتاق" type="number" />
        <select id="parking"><option value="true">پارکینگ</option><option value="false">پارکینگ ندارد</option></select>
        <select id="warehouse"><option value="true">انباری</option><option value="false">انباری ندارد</option></select>
        <select id="elevator"><option value="true">آسانسور</option><option value="false">آسانسور ندارد</option></select>
        <label for="address">محله:</label>
        <select id="address" required>
            <option value="Shahran">شهران</option>
            <option value="Pardis">پردیس</option>
            <option value="Shahrake Qods">شهرک قدس</option>
            <option value="Shahrake Gharb">شهرک غرب</option>
            <option value="North Program Organization">برنامه شمالی</option>
            <option value="Andisheh">اندیشه</option>
            <option value="West Ferdows Boulevard">بلوار فردوس غرب</option>
            <option value="Narmak">نارمک</option>
            <option value="Saadat Abad">سعادت‌آباد</option>
            <option value="Zafar">ظفر</option>
            <option value="Islamshahr">اسلامشهر</option>
            <option value="Pirouzi">پیروزی</option>
            <option value="Shahrake Shahid Bagheri">شهرک شهید باقری</option>
            <option value="Moniriyeh">مونیریه</option>
            <option value="Velenjak">ولنجک</option>
            <option value="Amirieh">امیریه</option>
            <option value="Southern Janatabad">جنات‌آباد جنوبی</option>
            <option value="Salsabil">سالسابل</option>
            <option value="Zargandeh">زرگنده</option>
            <option value="Feiz Garden">باغ فیض</option>
            <option value="Water Organization">سازمان آب</option>
            <option value="ShahrAra">شهرا</option>
            <option value="Gisha">گیشا</option>
            <option value="Ray">ری</option>
            <option value="Abbasabad">عباس‌آباد</option>
            <option value="Ostad Moein">استاد معین</option>
            <option value="Farmanieh">فرمانیه</option>
            <option value="Parand">پرند</option>
            <option value="Punak">پونک</option>
            <option value="Qasr-od-Dasht">قصرالدشت</option>
            <option value="Aqdasieh">قدسیه</option>
            <option value="Pakdasht">پاکدشت</option>
            <option value="Railway">راه‌آهن</option>
            <option value="Central Janatabad">جنات‌آباد مرکزی</option>
            <option value="East Ferdows Boulevard">بلوار فردوس شرقی</option>
            <option value="Pakdasht KhatunAbad">پاکدشت خاتون‌آباد</option>
            <option value="Sattarkhan">ستارخان</option>
            <option value="Baghestan">باغستان</option>
            <option value="Shahryar">شهریار</option>
            <option value="Northern Janatabad">جنات‌آباد شمالی</option>
            <option value="Daryan No">دریان نو</option>
            <option value="Southern Program Organization">سازمان برنامه جنوبی</option>
            <option value="Rudhen">رودهن</option>
            <option value="West Pars">غرب پارس</option>
            <option value="Afsarieh">افسریه</option>
            <option value="Marzdaran">مرزداران</option>
            <option value="Dorous">دوروس</option>
            <option value="Sadeghieh">صادقیه</option>
            <option value="Chahardangeh">چهاردانگه</option>
            <option value="Baqershahr">باقرشهر</option>
            <option value="Jeyhoon">جیحون</option>
            <option value="Lavizan">لاویزان</option>
            <option value="Shams Abad">شمس‌آباد</option>
            <option value="Fatemi">فاطمی</option>
            <option value="Keshavarz Boulevard">بلوار کشاورز</option>
            <option value="Kahrizak">کهریزک</option>
            <option value="Qarchak">قرچک</option>
            <option value="Northren Jamalzadeh">جمالزاده شمالی</option>
            <option value="Azarbaijan">آذربایجان</option>
            <option value="Bahar">بهار</option>
            <option value="Persian Gulf Martyrs Lake">دریاچه شهدای خلیج فارس</option>
            <option value="Beryanak">بریانک</option>
            <option value="Heshmatieh">هشتمیه</option>
            <option value="Elm-o-Sanat">علم و صنعت</option>
            <option value="Golestan">گلستان</option>
            <option value="Shahr-e-Ziba">شهر زیبا</option>
            <option value="Pasdaran">پاسداران</option>
            <option value="Chardivari">چهاردیواری</option>
            <option value="Gheitarieh">قیتریه</option>
            <option value="Kamranieh">کامرانیه</option>
            <option value="Gholhak">غولک</option>
            <option value="Heravi">هرامی</option>
            <option value="Hashemi">هاشمی</option>
            <option value="Dehkade Olampic">دهکده المپیک</option>
            <option value="Damavand">داموند</option>
            <option value="Republic">جمهوری</option>
            <option value="Zaferanieh">ظفرانیه</option>
            <option value="Qazvin Imamzadeh Hassan">قزوین امامزاده حسن</option>
            <option value="Niavaran">نیواران</option>
            <option value="Valiasr">ولیعصر</option>
            <option value="Qalandari">قلندری</option>
            <option value="Amir Bahador">امیر بهادر</option>
            <option value="Ekhtiarieh">اختیاریه</option>
            <option value="Ekbatan">اکباتان</option>
            <option value="Absard">ابسرد</option>
            <option value="Haft Tir">هفت تیر</option>
            <option value="Mahallati">محلتی</option>
            <option value="Ozgol">اوزگل</option>
            <option value="Tajrish">تجریش</option>
            <option value="Abazar">آبزار</option>
            <option value="Koohsar">کوهسار</option>
            <option value="Hekmat">حکمت</option>
            <option value="Parastar">پاراستار</option>
            <option value="Lavasan">لواسان</option>
            <option value="Majidieh">مجیدیه</option>
            <option value="Southern Chitgar">چیتگر جنوبی</option>
            <option value="Karimkhan">کریمیخان</option>
            <option value="Si Metri Ji">سی متری جی</option>
            <option value="Karoon">کارون</option>
            <option value="Northern Chitgar">چیتگر شمالی</option>
            <option value="East Pars">پارس شرقی</option>
            <option value="Kook">کیک</option>
            <option value="Air force">نیروی هوایی</option>
            <option value="Sohanak">سوهانک</option>
            <option value="Komeil">کمیل</option>
            <option value="Azadshahr">آزادشهر</option>
            <option value="Zibadasht">زیبادشت</option>
            <option value="Amirabad">امیرآباد</option>
            <option value="Dezashib">دژاشیب</option>
            <option value="Elahieh">الهیه</option>
            <option value="Mirdamad">میرداماد</option>
            <option value="Razi">رازی</option>
            <option value="Jordan">اردن</option>
            <option value="Mahmoudieh">محمودیّه</option>
            <option value="Shahedshahr">شاهدشهر</option>
            <option value="Yaftabad">یافت‌آباد</option>
            <option value="Mehran">مهران</option>
            <option value="Nasim Shahr">نسیم‌شهر</option>
            <option value="Tenant">مستاجر</option>
            <option value="Chardangeh">چهاردانگه</option>
            <option value="Fallah">فلاح</option>
            <option value="Eskandari">اسکندری</option>
            <option value="Shahrakeh Naft">شهرکه نفت</option>
            <option value="Ajudaniye">اجودانیه</option>
            <option value="Tehransar">تهرانسر</option>
            <option value="Nawab">نواب</option>
            <option value="Yousef Abad">یوسف‌آباد</option>
        </select>
        <button onclick="predict()">پیش‌بینی‌ قیمت</button>
        <div id="result" style="margin-top: 20px;"></div>
    `;
};
  
async function predict() {
  const data = {
    Area: parseFloat(document.getElementById('area').value),
    Room: parseInt(document.getElementById('room').value),
    Parking: document.getElementById('parking').value === 'true',
    Warehouse: document.getElementById('warehouse').value === 'true',
    Elevator: document.getElementById('elevator').value === 'true',
    Address: document.getElementById('address').value
  };
  
  console.log('Sending data:', data);
  
  try {
    const url = `${window.env.API_URL}`;
    console.log('Sending request to:', url);
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    const result = await res.json();
    console.log('API response:', result);
    
    document.getElementById('result').innerHTML = `
      <p> قیمت: <strong>${result.price_toman.toLocaleString()} تومان</strong></p>
      <p> قیمت بر اساس تورم: <strong>${result.price_toman_with_inflation.toLocaleString()} تومان</strong></p>
    `;
  } catch (error) {
    console.error('Error during prediction:', error);
    document.getElementById('result').innerHTML = `
      <p class="error">⚠️ Error: ${error.message}</p>
    `;
  }
}