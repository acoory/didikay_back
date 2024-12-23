export const formatDataForMail = (data: any) => {

    const date = new Date(data.dateTimeStart);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // @ts-ignore
    const dateFormated = date.toLocaleDateString('fr-FR', options);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const dateFormatedString = `${dateFormated}`;
    const hoursFormated = `${hour}:${minutes}`;
    const location = "Paris";


    return {
        date: dateFormatedString,
        hour: hoursFormated,
        location: location,
        client: data.user.firstname + " " + data.user.lastname
    }
}