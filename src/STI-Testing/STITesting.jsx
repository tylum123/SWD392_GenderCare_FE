import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Calendar,
  DatePicker,
  Input,
  Select,
  Switch,
  Button,
  message,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useServices } from "../hooks/useServices";
import { motion } from "framer-motion";

const { Option } = Select;
const STORAGE_KEY = "cycle-tracking-entries";

const STITesting = () => {
  const { services, loading, error } = useServices();

  // All hooks must be called unconditionally at the top
  const [selectedDate, setSelectedDate] = useState(null);
  const [mood, setMood] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [lastPeriodStart, setLastPeriodStart] = useState(null);
  const [isOnBirthControl, setIsOnBirthControl] = useState(false);
  const [birthControlReminder, setBirthControlReminder] = useState(false);
  const [birthControlTime, setBirthControlTime] = useState(null);
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage when component mounts
  useEffect(() => {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Calculate ovulation date (14 days before next period)
  const calculateOvulationDate = () => {
    if (!lastPeriodStart) return null;
    return dayjs(lastPeriodStart).add(cycleLength - 14, "day");
  };

  // Calculate fertility window (5 days before and 1 day after ovulation)
  const calculateFertilityWindow = () => {
    const ovulationDate = calculateOvulationDate();
    if (!ovulationDate) return { start: null, end: null };

    return {
      start: ovulationDate.subtract(5, "day"),
      end: ovulationDate.add(1, "day"),
    };
  };

  // Calculate next period date
  const calculateNextPeriod = () => {
    if (!lastPeriodStart) return null;
    return dayjs(lastPeriodStart).add(cycleLength, "day");
  };

  // Check if current date is in fertility window
  const isInFertilityWindow = (date) => {
    const fertilityWindow = calculateFertilityWindow();
    if (!fertilityWindow.start || !fertilityWindow.end) return false;

    return (
      date.isAfter(fertilityWindow.start) && date.isBefore(fertilityWindow.end)
    );
  };

  // Check if current date is ovulation day
  const isOvulationDay = (date) => {
    const ovulationDate = calculateOvulationDate();
    if (!ovulationDate) return false;

    return date.isSame(ovulationDate, "day");
  };

  // Get entry for a specific date
  const getEntryForDate = (date) => {
    return entries.find((entry) => dayjs(entry.date).isSame(date, "day"));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Load existing entry data if available
    const existingEntry = getEntryForDate(date);
    if (existingEntry) {
      setMood(existingEntry.mood);
      setSymptoms(existingEntry.symptoms);
      setNotes(existingEntry.notes);
      setCycleLength(existingEntry.cycleLength);
      setLastPeriodStart(existingEntry.lastPeriodStart);
      setIsOnBirthControl(existingEntry.isOnBirthControl);
      setBirthControlReminder(existingEntry.birthControlReminder);
      setBirthControlTime(existingEntry.birthControlTime);
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setMood("");
    setSymptoms([]);
    setNotes("");
  };

  const handleSaveEntry = () => {
    if (!selectedDate) {
      message.error("Please select a date");
      return;
    }

    const newEntry = {
      id: Date.now(), // Generate unique ID
      date: selectedDate,
      mood,
      symptoms,
      notes,
      cycleLength,
      lastPeriodStart,
      isOnBirthControl,
      birthControlReminder,
      birthControlTime,
      ovulationDate: calculateOvulationDate(),
      nextPeriodDate: calculateNextPeriod(),
      fertilityWindow: calculateFertilityWindow(),
    };

    // Add new entry to entries array
    setEntries((prevEntries) => [...prevEntries, newEntry]);

    notification.success({
      message: "Entry Saved",
      description: "Your cycle tracking entry has been saved successfully.",
    });

    resetForm();
  };

  const handleBirthControlReminderChange = (checked) => {
    setBirthControlReminder(checked);
    if (checked) {
      notification.info({
        message: "Birth Control Reminder Set",
        description:
          "You will be reminded to take your birth control medication daily.",
      });
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Our Healthcare Services
            </h1>
            <div className="flex items-center justify-center space-x-2 mt-8">
              <div
                className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Loading our services...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Our Healthcare Services
            </h1>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md max-w-2xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              Our Healthcare Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto mt-5 text-xl text-gray-600"
            >
              Comprehensive gender-sensitive healthcare services designed with
              privacy, respect, and your unique reproductive health needs in
              mind.
            </motion.p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Cycle Tracking</h1>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Calendar View" className="h-full">
              <Calendar
                onSelect={handleDateSelect}
                className="cycle-calendar"
                cellRender={(date) => {
                  const entry = getEntryForDate(date);
                  const cellContent = [];

                  // Add ovulation indicator
                  if (isOvulationDay(date)) {
                    cellContent.push(
                      <div
                        key="ovulation"
                        className="bg-yellow-200 p-1 rounded mb-1 text-xs"
                      >
                        Ovulation
                      </div>
                    );
                  }

                  // Add fertility window indicator
                  if (isInFertilityWindow(date)) {
                    cellContent.push(
                      <div
                        key="fertile"
                        className="bg-pink-200 p-1 rounded mb-1 text-xs"
                      >
                        Fertile
                      </div>
                    );
                  }

                  // Add entry indicators
                  if (entry) {
                    if (entry.mood) {
                      cellContent.push(
                        <div
                          key="mood"
                          className="bg-blue-100 p-1 rounded mb-1 text-xs"
                        >
                          Mood: {entry.mood}
                        </div>
                      );
                    }
                    if (entry.symptoms && entry.symptoms.length > 0) {
                      const displayedSymptoms = entry.symptoms
                        .slice(0, 2)
                        .join(", ");
                      const hasMore = entry.symptoms.length > 1;
                      cellContent.push(
                        <div
                          key="symptoms"
                          className="bg-green-100 p-1 rounded mb-1 text-xs"
                        >
                          Symptoms: {displayedSymptoms}
                          {hasMore ? ", ..." : ""}
                        </div>
                      );
                    }
                    if (entry.isOnBirthControl) {
                      cellContent.push(
                        <div
                          key="birthControl"
                          className="bg-purple-100 p-1 rounded mb-1 text-xs"
                        >
                          Birth Control
                        </div>
                      );
                    }
                  }

                  return cellContent.length > 0 ? (
                    <div style={{ overflow: "visible", minHeight: 0 }}>
                      {cellContent}
                    </div>
                  ) : null;
                }}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Daily Entry" className="h-full">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Selected Date</label>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateSelect}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block mb-2">Cycle Length (days)</label>
                  <Input
                    type="number"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value))}
                    min={21}
                    max={35}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block mb-2">Last Period Start Date</label>
                  <DatePicker
                    value={lastPeriodStart}
                    onChange={setLastPeriodStart}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block mb-2">Mood</label>
                  <Select
                    className="w-full"
                    value={mood}
                    onChange={setMood}
                    placeholder="How are you feeling today?"
                  >
                    <Option value="happy">Happy</Option>
                    <Option value="sad">Sad</Option>
                    <Option value="energetic">Energetic</Option>
                    <Option value="tired">Tired</Option>
                    <Option value="irritable">Irritable</Option>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2">Symptoms</label>
                  <Select
                    mode="multiple"
                    className="w-full"
                    value={symptoms}
                    onChange={setSymptoms}
                    placeholder="Select symptoms"
                  >
                    <Option value="cramps">Cramps</Option>
                    <Option value="headache">Headache</Option>
                    <Option value="bloating">Bloating</Option>
                    <Option value="tender_breasts">Tender Breasts</Option>
                    <Option value="fatigue">Fatigue</Option>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2">Notes</label>
                  <Input.TextArea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional notes..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block mb-2">Birth Control</label>
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={isOnBirthControl}
                      onChange={setIsOnBirthControl}
                    />
                    <span>On Birth Control</span>
                  </div>
                </div>

                {isOnBirthControl && (
                  <div>
                    <label className="block mb-2">Birth Control Reminder</label>
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={birthControlReminder}
                        onChange={handleBirthControlReminderChange}
                      />
                      <span>Set Daily Reminder</span>
                    </div>
                    {birthControlReminder && (
                      <div className="mt-2">
                        <label className="block mb-2">Reminder Time</label>
                        <DatePicker
                          picker="time"
                          value={birthControlTime}
                          onChange={setBirthControlTime}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                )}

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleSaveEntry}
                  className="w-full"
                >
                  Save Entry
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default STITesting;
