import React, { useState } from 'react';

import styled from "styled-components";
import NumberOne from "../assets/NumberOne.svg";
import allthinkwedding from "../assets/allthinkwedding.svg";
import findingagift from "../assets/findingagift.svg";
import toyourself from "../assets/toyourself.svg";
import serviceand from "../assets/serviceand.svg";
import intereseted from "../assets/intereseted.svg";
import shopping from "../assets/shopping.svg";
import other from "../assets/other.svg";
import NumberTwo from "../assets/NumberTwo.svg";
import online from "../assets/online.svg";
import instore from "../assets/instore.svg";    
import NumberThree from "../assets/NumberThree.svg";
import NumberFour from "../assets/NumberFour.svg";
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

// const Section = styled.div`
//   border: 1px solid #e5e7eb;
//   border-radius: 0.5rem;
//   overflow: hidden;
//   margin-bottom: 1.5rem;
// `;

// const SectionHeader = styled.button`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 1rem;
//   background: white;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     background: #f9fafb;
//   }
// `;

// const HeaderContent = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

// const NumberCircle = styled.div`
//   width: 2rem;
//   height: 2rem;
//   background: black;
//   border-radius: 50%;
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 0.875rem;
// `;

// const HeaderText = styled.div`
//   text-align: left;
// `;

// const HeaderTitle = styled.h2`
//   font-weight: 600;
//   margin: 0;
// `;

// const HeaderSubtitle = styled.p`
//   color: #6b7280;
//   font-size: 0.875rem;
//   margin: 0;
// `;

const ChevronIcon = styled(ChevronDown)`
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.2s ease-in-out;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const Card = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CardIcon = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  margin: 0;
`;

const CardDescription = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Duration = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.875rem;
`;
const Section = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: ${props => props.hasBorder ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  cursor: pointer;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NumberCircle = styled.div`
  width: 2rem;
  height: 2rem;
  background: black;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
`;

const HeaderText = styled.div`
  text-align: left;
`;

const HeaderTitle = styled.h2`
  font-weight: 600;
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

const CalendarContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 2rem;
`;

const Calendar = styled.div`
  flex: 1;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MonthTitle = styled.h3`
  font-weight: 600;
  margin: 0;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e5e7eb;
`;

const DayCell = styled.button`
  padding: 0.75rem;
  background: white;
  border: none;
  cursor: pointer;
  ${props => props.isSelected && `
    background: black;
    color: white;
  `}
  ${props => props.isAvailable && `
    color: #1d4ed8;
  `}
  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

const TimeSlots = styled.div`
  flex: 1;
`;

const TimeSlotsSection = styled.div`
  margin-bottom: 1.5rem;
`;

const TimeSlotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
`;

const TimeSlot = styled.button`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f9fafb;
  }
`;

const ContactForm = styled.form`
  padding: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #f9fafb;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #f9fafb;
  min-height: 100px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RadioButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: ${props => props.selected ? 'black' : 'white'};
  color: ${props => props.selected ? 'white' : 'black'};
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: black;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
`;
const DateSection = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background: white;
`;
const ContactSection = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background: white;
`;

const BookingAppointment = () => {
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [expandedTimeSection, setExpandedTimeSection] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingFor, setShoppingFor] = useState(null);
  const [isSpecialOccasion, setIsSpecialOccasion] = useState(null);

  const timeSlots = {
    morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
    evening: ['03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM']
  };


  const occasions = [
    {
      title: "All Things Wedding",
      description: "We'll help you find the perfect piece, from engagement rings to bridal party gifts.",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    },
    {
      title: "Finding A Gift",
      description: "Special occasion coming up? Let an expert help you choose a gift they'll love.",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    },
    {
      title: "To Yourself, With Love",
      description: "You deserve joy! Whether it's a promotion or a 'pick-me-up, find the perfect piece with us",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    },
    {
      title: "Service And Repair",
      description: "Broken jewelry? Due for inspection? Keep your jewelry at its best.",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    },
    {
      title: "Interested In Custom",
      description: "Looking for a one-of-a-kind creation? Make it a reality with help from an expert.",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    },
    {
      title: "Shopping For Watches",
      description: "Let's help you find your timepiece by exploring features and styles.",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    },
    {
      title: "Other",
      description: "Looking to shop? Learn? Compare? Tell us what you need. We're here to help!",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    }
  ];

  const locations = [
    {
      title: "Online",
      description: "We'll start a live chat at the time you choose. Turn on audio or video if you like. It's all up to you!",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    },
    {
      title: "In-Store",
      description: "You'll meet with an expert in person at a store near you.",
      duration: "30-60 Minutes",
      icon: "/api/placeholder/48/48"
    }
  ];

  return (
    <Container>
      <Title>Book Time With an Expert</Title>

      {/* Occasion Section */}
      <Section>
        <SectionHeader onClick={() => setIsOccasionOpen(!isOccasionOpen)}>
          <HeaderContent>
            <NumberCircle>01</NumberCircle>
            <HeaderText>
              <HeaderTitle>What's the occasion?</HeaderTitle>
              <HeaderSubtitle>Finding a Gift, Anniversaries</HeaderSubtitle>
            </HeaderText>
          </HeaderContent>
          <ChevronIcon isOpen={isOccasionOpen} />
        </SectionHeader>

        {isOccasionOpen && (
          <ContentGrid>
            {occasions.map((occasion, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardIcon src={occasion.icon} alt="" />
                  <CardTitle>{occasion.title}</CardTitle>
                </CardHeader>
                <CardDescription>{occasion.description}</CardDescription>
                <Duration>{occasion.duration}</Duration>
              </Card>
            ))}
          </ContentGrid>
        )}
      </Section>

      {/* Location Section */}
      <Section>
        <SectionHeader onClick={() => setIsLocationOpen(!isLocationOpen)}>
          <HeaderContent>
            <NumberCircle>02</NumberCircle>
            <HeaderText>
              <HeaderTitle>Location</HeaderTitle>
              <HeaderSubtitle>Online</HeaderSubtitle>
            </HeaderText>
          </HeaderContent>
          <ChevronIcon isOpen={isLocationOpen} />
        </SectionHeader>

        {isLocationOpen && (
          <ContentGrid>
            {locations.map((location, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardIcon src={location.icon} alt="" />
                  <CardTitle>{location.title}</CardTitle>
                </CardHeader>
                <CardDescription>{location.description}</CardDescription>
                <Duration>{location.duration}</Duration>
              </Card>
            ))}
          </ContentGrid>
        )}
      </Section>

 <DateSection>
      <SectionHeader onClick={() => setIsDateOpen(!isDateOpen)}>
        <HeaderContent>
          <NumberCircle>03</NumberCircle>
          <HeaderText>
            <HeaderTitle>Date</HeaderTitle>
            <HeaderSubtitle>{selectedDate || 'Select a date and time'}</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
        <ChevronDown />
      </SectionHeader>

      {isDateOpen && (
        <CalendarContainer>
          <Calendar>
            <CalendarHeader>
              <MonthTitle>May 2023</MonthTitle>
              <div>
                <ChevronLeft />
                <ChevronRight />
              </div>
            </CalendarHeader>
            <WeekDays>
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </WeekDays>
            <DaysGrid>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <DayCell
                  key={day}
                  isSelected={day === 18}
                  isAvailable={[3, 10, 17, 24].includes(day)}
                  onClick={() => setSelectedDate(`May ${day}, 2023`)}
                >
                  {day}
                </DayCell>
              ))}
            </DaysGrid>
          </Calendar>

          <TimeSlots>
            {Object.entries(timeSlots).map(([period, slots]) => (
              <TimeSlotsSection key={period}>
                <TimeSlotHeader 
                  onClick={() => setExpandedTimeSection(
                    expandedTimeSection === period ? null : period
                  )}
                >
                  <div>
                    {slots.length} Available
                    <div style={{color: '#6b7280', fontSize: '0.875rem'}}>
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </div>
                  </div>
                  <ChevronDown />
                </TimeSlotHeader>
                {expandedTimeSection === period && (
                  <TimeGrid>
                    {slots.map(time => (
                      <TimeSlot
                        key={time}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </TimeSlot>
                    ))}
                  </TimeGrid>
                )}
              </TimeSlotsSection>
            ))}
          </TimeSlots>
        </CalendarContainer>
      )}
      </DateSection>
      <ContactSection>

      <SectionHeader onClick={() => setIsOpen(!isOpen)}>
        <HeaderContent>
          <NumberCircle>04</NumberCircle>
          <HeaderText>
            <HeaderTitle>Contact</HeaderTitle>
            <HeaderSubtitle>Enter your details</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
        <ChevronDown />
      </SectionHeader>

      {isOpen && (
        <ContactForm>
          <FormRow>
            <FormGroup>
              <Label>Full Name</Label>
              <Input type="text" placeholder="Enter name" />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input type="text" placeholder="Enter Last Name" />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter Last Name" />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input type="tel" placeholder="+1 000000" />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <input type="checkbox" id="consent" />
            <label htmlFor="consent" style={{marginLeft: '0.5rem', fontSize: '0.875rem', color: '#4b5563'}}>
              I consent to receive recurring automated informational and personalized text messages...
            </label>
          </FormGroup>

          <FormGroup>
            <Label>Almost there...</Label>
            <TextArea placeholder="Comment" />
          </FormGroup>

          <FormGroup>
            <Label>Who are you shopping for?</Label>
            <RadioGroup>
              <RadioButton 
                selected={shoppingFor === 'myself'}
                onClick={() => setShoppingFor('myself')}
              >
                Myself
              </RadioButton>
              <RadioButton 
                selected={shoppingFor === 'someone'}
                onClick={() => setShoppingFor('someone')}
              >
                Someone Else
              </RadioButton>
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>Are you shopping for a special occasion?</Label>
            <RadioGroup>
              <RadioButton 
                selected={isSpecialOccasion === true}
                onClick={() => setIsSpecialOccasion(true)}
              >
                Yes
              </RadioButton>
              <RadioButton 
                selected={isSpecialOccasion === false}
                onClick={() => setIsSpecialOccasion(false)}
              >
                No
              </RadioButton>
            </RadioGroup>
          </FormGroup>

          <SubmitButton>Book My Appointment</SubmitButton>
        </ContactForm >
      )}
      </ContactSection>
    </Container>
  );
};
export default BookingAppointment;