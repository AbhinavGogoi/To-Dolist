import { React, useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Rating, Box } from "@mui/material";
import img1 from "../../Assets/image1.jpg";
import img2 from "../../Assets/image2.jpg";
import img3 from "../../Assets/image3.jpg";
export default function Home() {
  const [value, setValue] = useState(2);
  const [value2, setValue2] = useState(2);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="menu">
        <MenuOutlined onClick={showDrawer} />
      </div>
      <div className="home-container">
        <div className="description">
          <div className="heading">
            <div className="welcome">
              <p>
                <strong>Welcome To-Do</strong>
              </p>
            </div>
            <h1>WELCOME TO THE TO - DO LIST WEBSITE</h1>
            <div className="buttons">
              <Button type="primary">Get Started</Button>
              <Button className="btn btn-secondary">Learn More</Button>
            </div>
            <h1>Customer Review</h1>
          </div>
          <div className="review">
            <div className="cards">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              quis possimus amet natus ipsam alias ipsum, eaque dolorem porro
              itaque aspernatur, corrupti nobis illum suscipit temporibus,
              aliquid vero repellendus quas!
              <hr />
              <div className="rate">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="user-rating"
                    value={value2}
                    onChange={(event, newValue2) => {
                      setValue2(newValue2);
                    }}
                  />
                </Box>
              </div>
            </div>
            <div className="cards">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam, id! Asperiores sunt aperiam maxime pariatur expedita
              non ipsa illo itaque ex voluptates corporis vero perspiciatis,
              alias sapiente quis dolorem repellendus?
              <hr />
              <div className="rate">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="user-rating"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="image">
          <div className="card-container">
            <img src={img1} className="card card1" alt="Card 1" />
            <img src={img2} className="card card2" alt="Card 2" />
            <img src={img3} className="card card3" alt="Card 3" />
          </div>
        </div>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
      >
        <Navbar />
      </Drawer>
    </>
  );
}
