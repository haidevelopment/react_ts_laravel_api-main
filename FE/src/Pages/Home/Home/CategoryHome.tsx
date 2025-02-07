import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect } from "react";
import { getCategories } from "../../../Features/Slices/categorySlice";
const CategoryHome = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={6}
        slidesPerGroup={5}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 5, slidesPerGroup: 5 },
        }}
      >
        {categories?.original?.map((c) => (
          <SwiperSlide key={c?.id}>
            <div className="category-item">
              <img
                src={`http://127.0.0.1:8000/storage/category/${c?.image}`}
                alt={c?.name}
                width={170}
              />
              <p>{c?.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryHome;
