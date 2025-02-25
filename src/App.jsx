import { useRef, useState } from "react";
import Card from "./components/Card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialItems = {
  "🌽": {
    icon: "🌽",
    name: "ข้าวโพด",
    price: "-",
    qty: "-",
    bg: "bg-amber-100",
  },
  "🍅": {
    icon: "🍅",
    name: "มะเขือเทศ",
    price: "-",
    qty: "-",
    bg: "bg-red-100",
  },
  "🥦": {
    icon: "🥦",
    name: "บรอกโคลี",
    price: "-",
    qty: "-",
    bg: "bg-green-100",
  },
  "🍆": {
    icon: "🍆",
    name: "มะเขือยาว",
    price: "-",
    qty: "-",
    bg: "bg-purple-100",
  },
  "🥕": {
    icon: "🥕",
    name: "แครอท",
    price: "-",
    qty: "-",
    bg: "bg-orange-100",
  },
};
function App() {
  const [items, setItems] = useState(initialItems);
  const [itemOrder, setItemOrder] = useState(Object.keys(initialItems));
  const modalRef = useRef(null);

  function handleCalculate(id, key, value) {
    setItems((items) => {
      return {
        ...items,
        [id]: {
          ...items[id],
          [key]: value,
        },
      };
    });
  }

  function reset() {
    setItems(initialItems);
    setItemOrder(Object.keys(initialItems));
    modalRef.current.close();
  }

  function onDragEnd(result) {
    if (!result.destination) return;
    const newOrder = Array.from(itemOrder);
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setItemOrder(newOrder);
  }

  function handleSort(e) {
    const value = e.target.value;
    let sortedOrder = [...itemOrder];

    if (value === "price-desc") {
      sortedOrder.sort(
        (a, b) =>
          (parseInt(items[b].price) || 0) - (parseInt(items[a].price) || 0)
      );
    } else if (value === "price-asc") {
      sortedOrder.sort(
        (a, b) =>
          (parseInt(items[a].price) || 0) - (parseInt(items[b].price) || 0)
      );
    } else if (value === "qty-desc") {
      sortedOrder.sort(
        (a, b) => (parseInt(items[b].qty) || 0) - (parseInt(items[a].qty) || 0)
      );
    } else if (value === "qty-asc") {
      sortedOrder.sort(
        (a, b) => (parseInt(items[a].qty) || 0) - (parseInt(items[b].qty) || 0)
      );
    }

    setItemOrder(sortedOrder);
  }

  const total = Object.values(items).reduce((acc, item) => {
    const price = parseInt(item.price) || 0;
    const qty = parseInt(item.qty) || 0;
    return acc + price * qty;
  }, 0);

  return (
    <>
      <dialog className="modal modal-bottom sm:modal-middle" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">รีเซ็ตอย่างมั่นใจ?</h3>
          <div className="modal-action justify-center">
            <form method="dialog">
              <button className="btn btn-dash btn-primary">ปิด</button>
            </form>
            <button className="btn btn-primary" onClick={reset}>
              ยืนยัน
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="container px-4 pt-6 pb-40 mx-auto">
        <h1 className="text-3xl text-center pb-2 font-bold mb-6">
          คำนวณราคาผัก
        </h1>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {itemOrder.map((item) => (
            <Card
              key={item}
              item={items[item]}
              onCalculate={handleCalculate}
            />
          ))}
        </div>

        <div className="overflow-x-hidden mt-16 sm:mt-20 max-w-xl mx-auto">
          <h2 className="text-center text-2xl font-semibold mb-4">สรุปผล</h2>
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">ไอคอน</th>
                <th>ชื่อ</th>
                <th className="text-end">ราคา</th>
                <th className="text-end">จำนวน</th>
                <th className="text-end">รวม</th>
              </tr>
            </thead>
            <tbody>
              {itemOrder.map((key) => {
                const item = items[key];
                return (
                  <tr key={item.icon}>
                    <td className="text-center">{item.icon}</td>
                    <td>{item.name}</td>
                    <td className="text-end">{parseInt(item.price) || 0}</td>
                    <td className="text-end">{parseInt(item.qty) || 0}</td>
                    <td className="text-end">{item.price * item.qty || "0"}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-center">
                  ยอดรวมทั้งหมด
                </td>

                <td className="text-end">
                  {Object.values(items).reduce(
                    (acc, item) => acc + (parseInt(item.qty) || 0),
                    0
                  )}
                </td>
                <td className="text-end">{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-base-200">
        <div className="grid gap-4 grid-cols-2 divide-x p-4">
          <div className="grid place-content-center">
            <span className="text-sm font-medium">ยอดสุทธิ:</span>
            <div className="space-x-2">
              <span className="font-bold text-6xl">
                {total}
              </span>
              <span className="font-medium">บาท</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <select
              defaultValue="เรียง"
              className="select text-sm w-full"
              onChange={handleSort}
            >
              <option value="เรียง" disabled>
                เรียง
              </option>
              <option value="price-desc">ราคามาก - น้อย</option>
              <option value="price-asc">ราคาน้อย - มาก</option>
              <option value="qty-desc">จำนวนมาก - น้อย</option>
              <option value="qty-asc">จำนวนน้อย - มาก</option>
            </select>
            <button
              className="btn btn-dash btn-primary btn-sm w-full"
              onClick={() => modalRef.current.showModal()}
            >
              รีเซ็ต
            </button>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="itemOrder" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemOrder.map((key, index) => {
                  const item = items[key];
                  return (
                    <Draggable key={key} draggableId={key} index={index}>
                      {(provided) => (
                        <a
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          href={`#${item.icon}`}
                          className="text-2xl btn rounded-none btn-primary h-12"
                        >
                          {item.icon}
                        </a>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
