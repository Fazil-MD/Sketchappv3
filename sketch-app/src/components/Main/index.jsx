import styles from "./styles.module.css";
import PaintBoard from "../PaintBoard";

const Main = ({ setLineColor }) => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("currentUser");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Sketchbook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.paintboard}>
				<PaintBoard />
			</div>

		</div>
	);
};

export default Main;