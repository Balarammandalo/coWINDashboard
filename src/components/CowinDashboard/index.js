// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusContainer = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initail: 'INITAIL',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusContainer.initail,
    last7DayVaccination: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
  }

  componentDidMount() {
    this.getCowinList()
  }

  getCowinList = async () => {
    this.setState({
      apiStatus: apiStatusContainer.inProgress,
    })
    const apiUrl = ' https://apis.ccbp.in/covid-vaccination-data'
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const last7DayVaccination = data.last_7_days_vaccination
      const vaccinationByGender = data.vaccination_by_gender
      const vaccinationByAge = data.vaccination_by_age
      this.setState({
        last7DayVaccination,
        vaccinationByAge,
        vaccinationByGender,
        apiStatus: apiStatusContainer.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContainer.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {
      last7DayVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage last7DayVaccination={last7DayVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureCowin = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <p>Something Went Wrong</p>
    </div>
  )

  renderLoaderCowin = () => (
    <div data-testid="loader" className="loaderIcon">
      <Loader type="ThreeDots" color="#ffffff" height={85} width={85} />
    </div>
  )

  renderAllCowinList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContainer.success:
        return this.renderSuccessCowin()
      case apiStatusContainer.failure:
        return this.renderFailureCowin()
      case apiStatusContainer.inProgress:
        return this.renderLoaderCowin()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <nav>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="websie logo"
            className="websie-img"
          />
          <p className="co-win-text">Co-WIN</p>
        </nav>
        <div>
          <h1>CoWIN Vaccination in India</h1>
        </div>
        {this.renderAllCowinList()}
      </div>
    )
  }
}

export default CowinDashboard
