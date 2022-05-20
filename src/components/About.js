import BarChart from "./BarChart";

function About() {
    return (
        <div className="main">
            <div className="jumbotron content-title">
                <h1 className="display-2">Welcome to Volcanoes Around The World</h1>
                <p className="lead"><strong>VATW</strong> is a React-based web application that makes use of several external React modules to access data via a volcano API.</p>
                <h2>
                    <u>How to get started:</u>
                </h2>
                <ol>
                    <li>Create a new account or log in to an existing one by clicking on the 'Log In' button in the top right of your screen</li>
                    <li>On the 'Volcano List' page, select which country's volcanoes you would like to see. You can also select a 'populated within' distance and filter results per column</li>
                    <li>Select the volcano you would like to view by clicking on the row that it appears on</li>
                    <li>Enjoy! You will now have access to detailed information for any volcano in the database. You can run reports on the 'Volcano Details' page to view some of this info in graph form</li>
                </ol>
                <hr className="my-4" />
                <p className="lead">If you're interested in the project, click the button below to view our page on GitHub :)</p>
                <a class="btn btn-warning btn-outline btn-lg" href="https://github.com/JakobReid/n10469150-cab230" target="_blank" role="button">Learn more</a>

            </div>
        </div>
    );
}

export default About;