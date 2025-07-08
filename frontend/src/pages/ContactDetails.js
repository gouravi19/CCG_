import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./styles/contactdetails.css";

export default function ContactDetails() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [expandedMessages, setExpandedMessages] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setContacts(res.data);
        setFilteredContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let results = [...contacts];


    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      results = results.filter(
        (contact) =>
          contact.name.toLowerCase().includes(lowerSearch) ||
          contact.email.toLowerCase().includes(lowerSearch) ||
          (contact.phone && contact.phone.includes(searchTerm)) ||
          contact.message.toLowerCase().includes(lowerSearch)
      );
    }

    if (dateFilter !== "all") {
      const now = new Date();
      results = results.filter((contact) => {
        const contactDate = new Date(contact.createdAt);
        switch (dateFilter) {
          case "today":
            return contactDate.toDateString() === now.toDateString();
          case "week": {
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            return contactDate >= oneWeekAgo;
          }
          case "month": {
            const oneMonthAgo = new Date(now);
            oneMonthAgo.setMonth(now.getMonth() - 1);
            return contactDate >= oneMonthAgo;
          }
          default:
            return true;
        }
      });
    }

    if (sortConfig.key) {
      results = [...results].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredContacts(results);
  }, [contacts, searchTerm, dateFilter, sortConfig]);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredContacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contact_submissions.xlsx");
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleMessageExpansion = (id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="contact-details-container">
      <div className="header-section">
        <h2>Submitted Contacts</h2>
        <div className="action-buttons">
          <button onClick={downloadExcel} className="download-btn">
            <i className="fas fa-file-excel"></i> Export Excel
          </button>
        </div>
      </div>

      <div className="filter-section">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="date-filter">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="contacts-table">
          <thead>
            <tr>
              <th onClick={() => requestSort("name")}>
                Name {sortConfig.key === "name" && (
                  <i className={`fas fa-arrow-${sortConfig.direction === "asc" ? "up" : "down"}`}></i>
                )}
              </th>
              <th onClick={() => requestSort("email")}>
                Email {sortConfig.key === "email" && (
                  <i className={`fas fa-arrow-${sortConfig.direction === "asc" ? "up" : "down"}`}></i>
                )}
              </th>
              <th onClick={() => requestSort("phone")}>
                Phone {sortConfig.key === "phone" && (
                  <i className={`fas fa-arrow-${sortConfig.direction === "asc" ? "up" : "down"}`}></i>
                )}
              </th>
              <th>Message</th>
              <th onClick={() => requestSort("createdAt")}>
                Timestamp {sortConfig.key === "createdAt" && (
                  <i className={`fas fa-arrow-${sortConfig.direction === "asc" ? "up" : "down"}`}></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, idx) => {
                const isExpanded = expandedMessages[contact._id || idx];
                const shouldTruncate = contact.message.length > 100 && !isExpanded;

                return (
                  <tr key={contact._id || idx}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone || "-"}</td>
                    <td
                      className={`message-cell ${isExpanded ? "expanded" : ""}`}
                      onClick={() => toggleMessageExpansion(contact._id || idx)}
                    >
                      {shouldTruncate
                        ? `${contact.message.substring(0, 100)}...`
                        : contact.message}
                      {contact.message.length > 100 && (
                        <span className="expand-toggle">
                          {isExpanded ? "Show less" : "Show more"}
                        </span>
                      )}
                    </td>
                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="no-results">
                <td colSpan="5">No contacts found matching your criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
