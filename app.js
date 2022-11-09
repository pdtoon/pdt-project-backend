const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const meetingroomRouter = require("./routes/meetingroom");
const reservationRouter = require("./routes/reservation");
const equipmentRouter = require("./routes/equipment");
const addonserviceRouter = require("./routes/addonservice");
const promotionRouter = require("./routes/promotion");
const reservationequipmentRouter = require("./routes/reservationequipment");
const reservationaddonRouter = require("./routes/reservationaddon");
const paymentRouter = require("./routes/payment");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/meetingroom", meetingroomRouter);
app.use("/reservation", reservationRouter);
app.use("/equipment", equipmentRouter);
app.use("/addonservice", addonserviceRouter);
app.use("/promotion", promotionRouter);
app.use("/reservationequipment", reservationequipmentRouter);
app.use("/reservationaddon", reservationaddonRouter);
app.use("/payment", paymentRouter);
const listener = app.listen(4000, () => {
  console.log("Listening on port " + listener.address().port);
});