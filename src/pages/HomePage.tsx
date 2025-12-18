export default function HomePage() {
  return (
    <>
           <section className="space-y-4">
                <h1 className="text-3xl font-bold">Welcome to Your Home Library</h1>
                <p className="text-gray-700 max-w-2xl">
                This is a random block of text to test scrolling behavior. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Recusandae minima laudantium asperiores perferendis non.
                </p>
            </section>

            
            <section>
                <h2 className="text-2xl font-semibold mb-4">Popular Books</h2>
                <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white shadow rounded">Book Card #1</div>
                <div className="p-4 bg-white shadow rounded">Book Card #2</div>
                <div className="p-4 bg-white shadow rounded">Book Card #3</div>
                <div className="p-4 bg-white shadow rounded">Book Card #4</div>
                <div className="p-4 bg-white shadow rounded">Book Card #5</div>
                <div className="p-4 bg-white shadow rounded">Book Card #6</div>
                <div className="p-4 bg-white shadow rounded">Book Card #7</div>
                <div className="p-4 bg-white shadow rounded">Book Card #8</div>
                </div>
            </section>

            
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Long Article</h2>
                <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque sapien non
                risus pulvinar, vel mattis erat fermentum. Sed id sagittis nisi, vitae scelerisque sem.
                Duis non iaculis arcu. Quisque ut massa nec lacus pharetra pharetra. Integer a mi
                ullamcorper, convallis nibh et, convallis eros. Sed rhoncus lorem nec tellus tincidunt
                consectetur. Nulla facilisi. Suspendisse potenti. Quisque tristique lorem vel lorem
                imperdiet, sit amet viverra ante laoreet. Vivamus at sem in mauris lacinia dictum nec
                et arcu. Maecenas dignissim, odio nec pretium fringilla, lectus lorem tincidunt urna,
                vel laoreet elit odio id nunc.
                </p>
                <p className="text-gray-700">
                Aenean hendrerit malesuada nulla, eget consectetur elit facilisis vel. Praesent fringilla
                faucibus augue, ut interdum velit fermentum vitae. Integer hendrerit massa nec urna
                faucibus, eu ullamcorper mi gravida. Fusce rutrum sapien eu libero euismod, id rutrum
                arcu luctus. Donec sollicitudin mauris quis arcu cursus, id consectetur nunc mollis.
                Praesent non dictum arcu. Donec non sapien magna. In eget mauris rhoncus, lobortis
                lacus quis, congue massa. Integer nec massa et ante cursus pharetra quis a nulla.
                </p>
            </section>

            
            <section>
                <h2 className="text-2xl font-semibold mb-4">More Test Boxes</h2>
                <div className="grid grid-cols-3 gap-6">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
                </div>
            </section>


            <section>
                <h2 className="text-2xl font-semibold mb-4">Scrollable Content Test</h2>
                <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ipsum expedita quasi omnis
                ducimus, minus saepe pariatur voluptates vel perspiciatis dolores voluptatum ratione 
                quidem molestias illum recusandae eligendi unde sit!  
                (repeat this block multiple times for long scrolling)
                </p>
                <div className="space-y-4 mt-4">
                <div className="h-32 bg-white shadow rounded"></div>
                <div className="h-32 bg-white shadow rounded"></div>
                <div className="h-32 bg-white shadow rounded"></div>
                <div className="h-32 bg-white shadow rounded"></div>
                <div className="h-32 bg-white shadow rounded"></div>
                <div className="h-32 bg-white shadow rounded"></div>
                </div>
            </section>

        </>
  );
}