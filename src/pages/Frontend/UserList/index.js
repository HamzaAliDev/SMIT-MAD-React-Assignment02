import React from 'react'

const LOCAL_STORAGE_KEY = 'assign02Users';
export default function UserList() {

    const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
    console.log(storedUser);

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <main>
            <div className="container-xl">
                <div className="row my-5">
                    <div className="col">
                        <h1 className='text-center' style={{ color: '#5a189a' }}>Users List</h1>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Added Date</th>
                                <th scope="col">UserId</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storedUser.map((user, i) => (
                                <tr key={i}>
                                    <th scope='row'>{i + 1}</th>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{formatDate(user.addDate)}</td>
                                    <td>{user.id}</td>
                                    <td className='text-success fst-normal'>{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
