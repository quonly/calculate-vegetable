import { useState } from "react";
import Card from "./components/Card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialItems = {
  "🌽": {
    icon: "🌽",
    name: "ข้าวโพด",
    price: 0,
    qty: 0,
    bg: "bg-amber-100",
  },
  "🍅": {
    icon: "🍅",
    name: "มะเขือเทศ",
    price: 0,
    qty: 0,
    bg: "bg-red-100",
  },
  "🥦": {
    icon: "🥦",
    name: "บรอกโคลี",
    price: 0,
    qty: 0,
    bg: "bg-green-100",
  },
  "🍆": {
    icon: "🍆",
    name: "มะเขือยาว",
    price: 0,
    qty: 0,
    bg: "bg-purple-100",
  },
  "🥕": {
    icon: "🥕",
    name: "แครอท",
    price: 0,
    qty: 0,
    bg: "bg-orange-100",
  },
};

function App() {
  const [items, setItems] = useState(initialItems);
  const [itemOrder, setItemOrder] = useState(Object.keys(initialItems));

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
    if (window.confirm("รีเซ็ตอย่างมั่นใจ?")) {
      setItems(initialItems);
      setItemOrder(Object.keys(initialItems));
    }
  }

  function onDragEnd(result) {
    if (!result.destination) return;
    const newOrder = Array.from(itemOrder);
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setItemOrder(newOrder);
  }

  const total = Object.values(items).reduce((acc, item) => {
    const price = parseInt(item.price) || 0;
    const qty = parseInt(item.qty) || 0;
    return acc + price * qty;
  }, 0);

  return (
    <>
      <div className="container px-4 pt-6 pb-22 mx-auto">
        <h1 className="text-3xl text-center pb-2 font-bold mb-6">
          คำนวณราคาผัก
        </h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="items">
            {(provided) => (
              <div
                className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-6"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemOrder.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          key={item}
                          item={items[item]}
                          onCalculate={handleCalculate}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="overflow-x-hidden mt-16 sm:mt-20 max-w-xl mx-auto">
          <h2 className="text-center text-2xl font-semibold">สรุปผล</h2>
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
              {Object.values(items).map((item) => (
                <tr key={item.icon}>
                  <td className="text-center">{item.icon}</td>
                  <td>{item.name}</td>
                  <td className="text-end">{item.price}</td>
                  <td className="text-end">{item.qty}</td>
                  <td className="text-end">{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-center">
                  ยอดรวมทั้งหมด
                </td>

                <td className="text-end">
                  {Object.values(items).reduce(
                    (acc, item) => acc + parseInt(item.qty) || 0,
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
        <div className="flex gap-4 items-center divide-x p-4">
          <div className="flex justify-between items-end flex-grow pe-2">
            <span className="font-medium">ยอดสุทธิ:</span>
            <div className="space-x-2">
              <span className="font-bold text-5xl">{total}</span>
              <span>บาท</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="btn btn-outline btn-sm w-full" onClick={reset}>
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
                          className="text-xl btn btn-primary no-underline h-12"
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
