import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads } from '../../actions/leads';

export class Leads extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired
    };


    componentDidMount() {
        this.props.getLeads();
    }

    render() {
        return (
            <div>
                <Fragment>
                    <h2>Users</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Mensaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.leads.map(lead => (
                                <tr key={lead.id}>
                                    <td>{lead.id}</td>
                                    <td>{lead.name}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.message}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm">
                                            Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    leads: state.leads.leads
});

export default connect(mapStateToProps, { getLeads })(Leads);
