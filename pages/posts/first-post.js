import Layout from "../../components/layout/Layout";
import productdata from "../../constants/data/productdata.json";
import Enterproduct from "../../scenes/posts/Enterproduct";

export default function FirstPost() {
  const curs = 36;
  return (
    <Layout>
      <div className="border-2 h-14 bg-sky-500 flex flex-col">{curs} uhy</div>

      <div className="max-w-11/12  bg-green-500  border-sky-500 m-auto">
        {productdata.products &&
          productdata.products.map((item) => (
            <div
              key={item.product_id}
              className=" border-2  flex justify-center p-4 m-3"
            >
              <Enterproduct product={item} curs={curs} />
            </div>
          ))}
      </div>
    </Layout>
  );
}
