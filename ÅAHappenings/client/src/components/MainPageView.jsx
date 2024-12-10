import CalendarView from "./CalendarView";
import FilterButton from "./FilterButton";

export default function MainPageView() {

    return (
        <div style={{
            marginTop: '7vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative',
            height: '100vh',
            width: '100%',
        }}>
            <FilterButton />
            <CalendarView />
        </div>
    );
}