export default function Card({ item, onCalculate }) {
  const price = parseInt(item.price) || 0;
  const qty = parseInt(item.qty) || 0;
  const total = price * qty;

  return (
    <div className="p-4 shadow-sm border border-gray-600 bg-base-100 grid sm:grid-cols-2 rounded-lg gap-6 sm:gap-4">
      <div className="flex gap-2 justify-center">
        <p
          className={`my-auto rounded-full h-28 w-28 text-6xl grid place-items-center p-2 bg-amber-100 ${item.bg}`}
        >
          {item.icon}
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-xl text-center sm:text-start font-medium">
          {item.name}
        </h2>
        <div>
          <label className="select">
            <span className="label w-22">ราคา:</span>
            <select
              value={item.price}
              className="select"
              onChange={(e) => onCalculate(item.icon, "price", e.target.value)}
            >
              <option value="0" disabled={true}>
                เลือกราคา
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>

        <label className="select">
          <span className="label w-22">จำนวน:</span>
          <select
            value={item.qty}
            className="select"
            onChange={(e) => onCalculate(item.icon, "qty", e.target.value)}
          >
            <option value="0" disabled={true}>
              เลือกจำนวน
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </label>

        <div className="flex justify-between items-end">
          <span>รวม:</span>
          <div className="space-x-2">
            <span className="font-bold text-3xl">{total}</span>
            <span>บาท</span>
          </div>
        </div>
      </div>
    </div>
  );
}
