export interface Booking {
  id: string;
  name: string;
  time: string;
  duration: string;
  date: string;
  image: string;
  phone: string;
  email: string;
  appointmentType: "Solo" | "Duo";
}
