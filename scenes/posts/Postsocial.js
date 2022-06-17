import Head from "next/head";

const Socials = ({ social }) => {
  return (
    <div className="flex w-full">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.0/css/all.css"
        />
      </Head>
      <div className="flex w-full justify-end m-auto">
        {social &&
          social.map((item) => (
            <div key={item.id} className="flex w-full m-auto">
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className=" w-full flex justify-center "
              >
                <i
                  className={`fab fa-${item.icon} hidden border-4 m-auto p-2 bg-sky-500`}
                />
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Socials;
