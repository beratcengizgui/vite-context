import React, { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";

export const ImagePage: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Yükleniyor durumu
    const { movies } = useUserContext();

    // User verisi geldiğinde images'ı güncelle
    useEffect(() => {
        if (movies && movies.length > 0) {
            console.log('user',movies);
            const imgs = movies.map((item: any) => item.thumbnailUrl);
            console.log("Images", imgs);
            setImages(imgs); // Veriler tamamen gelince images'ı güncelle
            setLoading(false); // Yükleme tamamlandı
        }
    }, [movies]); // User değiştiğinde çalışır

    return (
        <div>
            <h1>Image Page</h1>
            <div className="image-container" style={{ display: loading ? "none" : "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px" }}>
                {loading ? ( // Yükleme durumu kontrolü
                    <h1>Loading...</h1> // Yükleniyor mesajı
                ) : images.length > 0 ? (
                    images.map((item: any, index: number) => (
                        <img
                        loading="lazy"
                            key={index} // Her img için benzersiz anahtar
                            src={item}
                            alt=""
                            style={{ width: "150px", height: "150px", margin: "10px" }}
                        />
                    ))
                ) : (
                    <h1>No Images Available</h1> // Resim yoksa
                )}
            </div>
        </div>
    );
};

export default ImagePage;
