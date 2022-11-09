import Footer from './Footer';
import Header from './Header';

// eslint-disable-next-line no-return-assign
const PageLayout = (props) => (
  <div className="govuk-template__body">
    <Header />

    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        {props.children}
      </main>
    </div>

    <Footer />
  </div>
)

export default PageLayout;
