function MiddleSection() {
  return (
    <section className="bg-primary py-16 px-4">
      <div className="container mx-auto text-center flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl text-secondary font-bold mb-4">
            Haz más con menos esfuerzo
          </h2>
          <p className="text-lg md:text-2xl max-w-4xl text-typography font-semibold">
            Crea, edita y organiza tus tareas en todo momento. Personaliza las
            tareas con etiquetas y categorías para mantener todo en orden.
          </p>
        </div>
        <div className="md:w-80 w-72">
          <img
            src="/images/middle-section-image.webp"
            alt="Middle Section Image"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default MiddleSection;
