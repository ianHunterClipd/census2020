import React, { Component } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import TextInput from './TextInput';
import Dropdown from './Dropdown';
import { sendContactForm } from '../api/contact';

class Contact extends Component {
  static propTypes = {
    intl: intlShape.isRequired
  }

  static getInitialState () {
    return {
      name: '',
      organization: '',
      email: '',
      language: 'English',
      zip: '',
      interest: 'Volunteer',
      comment: ''
    };
  }

  constructor (props) {
    super(props);
    this.state = Contact.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  notifySubmitSuccess () {
    toast(
      this.props.intl.formatMessage({
        id: 'components.Contact.submitSuccessToast',
        description: 'Message shown to users in a popup when the contact form has been successfully submitted',
        defaultMessage: 'Your request for information has been submitted'
      }),
      {
        type: toast.TYPE.SUCCESS,
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 8000,
        hideProgressBar: true
      }
    );
  }

  handleChange (event) {
    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  clearForm () {
    this.setState(Contact.getInitialState());
  }

  async handleSubmit (event) {
    event.preventDefault();
    await sendContactForm(this.state);

    this.notifySubmitSuccess();
    this.clearForm();
  }

  render () {
    const {
      name,
      organization,
      email,
      language,
      zip,
      interest,
      comment
    } = this.state;

    const fields = [
      {
        name: 'name',
        value: name,
        label: (
          <FormattedMessage
            id="components.Contact.fields.name"
            defaultMessage="Name"
            description="Label for the Name field in the Contact form"
          />
        ),
        type: 'text',
        options: []
      },
      {
        name: 'organization',
        value: organization,
        label: (
          <FormattedMessage
            id="components.Contact.fields.organization"
            defaultMessage="Organization"
            description="Label for the Organization field in the Contact form"
          />
        ),
        type: 'text',
        options: []
      },
      {
        name: 'email',
        value: email,
        label: (
          <FormattedMessage
            id="components.Contact.fields.email"
            defaultMessage="Email"
            description="Label for the Email field in the Contact form"
          />
        ),
        type: 'text',
        options: []
      },
      {
        name: 'language',
        value: language,
        label: (
          <FormattedMessage
            id="components.Contact.fields.language"
            defaultMessage="Language Spoken"
            description="Label for the Language Spoken field in the Contact form"
          />
        ),
        type: 'dropdown',
        options: [
          'English',
          'Español',
          'Tiếng Việt'
        ]
      },
      {
        name: 'zip',
        value: zip,
        label: (
          <FormattedMessage
            id="components.Contact.fields.zip"
            defaultMessage="Zip Code"
            description="Label for the Zip Code field in the Contact form"
          />
        ),
        type: 'text',
        options: []
      },
      {
        name: 'interest',
        value: interest,
        label: (
          <FormattedMessage
            id="components.Contact.fields.interest"
            defaultMessage="Interest"
            description="Label for the Interest field in the Contact form"
          />
        ),
        type: 'dropdown',
        options: [
          {
            value: 'Volunteer',
            label: this.props.intl.formatMessage({
              key: 'volunteer',
              id: 'components.Contact.fields.interest.options.volunteer',
              defaultMessage: 'Volunteer',
              description: "'Volunteer' option for the Interest field in the Contact form"
            })
          },
          {
            value: 'Work for Census2020',
            label: this.props.intl.formatMessage({
              key: 'workForCensus',
              id: 'components.Contact.fields.interest.options.workForCensus',
              defaultMessage: 'Work for Census2020',
              description: "'Work for Census' option for the Interest field in the Contact form"
            })
          },
          {
            value: 'Request presentation',
            label: this.props.intl.formatMessage({
              key: 'requestPresentation',
              id: 'components.Contact.fields.interest.options.requestPresentation',
              defaultMessage: 'Request presentation',
              description: "'Request Presentation' option for the Interest field in the Contact form"
            })
          },
          {
            value: 'Other',
            label: this.props.intl.formatMessage({
              key: 'other',
              id: 'components.Contact.fields.interest.options.other',
              defaultMessage: 'Other',
              description: "'Other' option for the Interest field in the Contact form"
            })
          }
        ]
      },
      {
        name: 'comment',
        value: comment,
        label: (
          <FormattedMessage
            id="components.Contact.fields.comment"
            defaultMessage="Comment"
            description="Label for the Comment field in the Contact form"
          />
        ),
        type: 'textarea',
        options: []
      }
    ];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {
            fields.map((field, i) => {
              if (field.type === 'dropdown') {
                return (
                  <Dropdown
                    onChange={this.handleChange}
                    name={field.name}
                    value={field.value}
                    label={field.label}
                    options={field.options}
                    key={i}/>
                );
              } else {
                return (
                  <TextInput
                    onChange={this.handleChange}
                    name={field.name}
                    value={field.value}
                    label={field.label}
                    type={field.type}
                    key={i}/>
                );
              }
            })
          }
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

const WrappedContact = injectIntl(Contact);

export default WrappedContact;